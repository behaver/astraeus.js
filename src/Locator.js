'use strict';

const CelestialLocator = require('./locators/CelestialLocator');
const FixedStarLocator = require('./locators/FixedStarLocator');
const SunLocator = require('./locators/SolarStarLocator/planets/Sun');
const MercuryLocator = require('./locators/SolarStarLocator/planets/Mercury');
const VenusLocator = require('./locators/SolarStarLocator/planets/Venus');
const EarthLocator = require('./locators/SolarStarLocator/planets/Earth');
const MoonLocator = require('./locators/SolarStarLocator/planets/Moon');
const MarsLocator = require('./locators/SolarStarLocator/planets/Mars');
const JupiterLocator = require('./locators/SolarStarLocator/planets/Jupiter');
const SaturnLocator = require('./locators/SolarStarLocator/planets/Saturn');
const UranusLocator = require('./locators/SolarStarLocator/planets/Uranus');
const NeptuneLocator = require('./locators/SolarStarLocator/planets/Neptune');
const PlutoLocator = require('./locators/SolarStarLocator/planets/Pluto');

const JDateRepository = require('./time/JDate/JDateRepository');
const Coord = require('./Coord');

/**
 * Locator
 *
 * 星体定位器
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class Locator {

  /**
   * 构造函数
   */
  constructor() {
    // 声明私有空间
    this.private = {
      Locators: {
        sun: new SunLocator,
        mercury: new MercuryLocator,
        venus: new VenusLocator,
        earth: new EarthLocator,
        moon: new MoonLocator,
        mars: new MarsLocator,
        jupiter: new JupiterLocator,
        saturn: new SaturnLocator,
        uranus: new UranusLocator,
        neptune: new NeptuneLocator,
        pluto: new PlutoLocator,
      }, // 定位组件
      FixedStarLocator: new FixedStarLocator, // 恒星定位器
      starCategory: {}, // 恒星星表
      observatory: {
        longitude: -120,
        latitude: 30,
        elevation: 0,
        temperature: 20,
        pressure: 0,
      }, // 观测条件数据
      time: new JDateRepository, // 观测时间
      corrections: {
        nutation: 3, // 章动
        annualAberration: 0, // 周年光行差
        fk5: 0, // FK5偏差
        graDeflection: 0, // 引力偏转
        atmRefraction: 0, // 大气折射
        lightTime: 3, // 光行时
        annualParallax: 0, // 周年视差
      }, // 修正项设定（第一位: enabled; 第二位: with）
      Coord: new Coord, // 天球坐标处理对象
      coordSetting: {
        system: 'eqc', 
        isContinuous: false, 
        centerMode: 'geocentric', 
      }, // 坐标设定
      afterResultProcessed: null, // 处理结果坐标的回调函数
      calculate: {
        accuracy: 'normal', // 精度
      }, // 计算设定
    };

    // FixedStarLocator 设定同步
    this.private.FixedStarLocator.time = this.private.time;
    
    // Locators 设定同步
    this.updateLocatorsOptions();

    // Coord 设定同步
    this.updateCoordOptions();
  }

  /**
   * Coord 设定同步
   * 
   * @return {Locator} 返回 this 引用
   */
  updateCoordOptions() {
    let options = {
      // corrections
      enableNutation: this.private.corrections.nutation & 1,
      enableAnnualAberration: this.private.corrections.annualAberration & 1,
      enableGravitationalDeflection: this.private.corrections.graDeflection & 1,
      enableFK5: this.private.corrections.fk5 & 1,
      enableAR: this.private.corrections.atmRefraction & 1,

      // epoch
      epoch: this.private.time,

      // observatory
      obGeoLong: this.private.observatory.longitude,
      obGeoLat: this.private.observatory.latitude,
      obElevation: this.private.observatory.elevation,
    };

    this.private.Coord.options = options;

    return this;
  }

  /**
   * Locators 设定同步
   * 
   * @return {Locator} 返回 this 引用
   */
  updateLocatorsOptions() {
    let options = {
      time: this.private.time,
      withLTE: this.private.corrections.lightTime === 3,
    };

    for (let id in this.private.Locators) {
      let locator = this.private.Locators[id];
      locator.options(options);
    }

    return this;
  }

  /**
   * 设定观测条件数据
   * 
   * @param  {Number}  options.longitude   地理经度（单位：°）
   * @param  {Number}  options.latitude    地理纬度（单位：°）
   * @param  {Number}  options.elevation   海拔（单位：m）
   * @param  {Number}  options.temperature 温度（单位：℃）
   * @param  {Number}  options.pressure    大气压强（单位：Pa）
   * 
   * @return {Locator}                     返回 this 引用
   */
  onObservatory({
    longitude,
    latitude,
    elevation,
    temperature,
    pressure,
  }) {
    if (longitude !== undefined) {
      if (typeof(longitude) !== 'number') throw Error('The param longitude should be a Number.');
      this.private.observatory.longitude = longitude;
    }
    if (latitude !== undefined) {
      if (typeof(latitude) !== 'number') throw Error('The param latitude should be a Number.');
      this.private.observatory.latitude = latitude;
    }
    if (elevation !== undefined) {
      if (typeof(elevation) !== 'number') throw Error('The param elevation should be a Number.');
      this.private.observatory.elevation = elevation;
    }
    if (temperature !== undefined) {
      if (typeof(temperature) !== 'number') throw Error('The param temperature should be a Number.');
      this.private.observatory.temperature = temperature;
    }
    if (pressure !== undefined) {
      if (typeof(pressure) !== 'number') throw Error('The param pressure should be a Number.');
      this.private.observatory.pressure = pressure;
    }

    // Coord 设定同步
    this.updateCoordOptions();

    return this;
  }

  /**
   * 设定 观测时间
   * 
   * @param {JDateRepository} value 观测时间对象
   */
  set time(value) {
    if (!(value instanceof JDateRepository)) throw Error('The param value should be an instance of JDateRepository.');
    
    this.private.time = value;

    this.private.FixedStarLocator.time = this.private.time;
    
    // Locators 设定同步
    this.updateLocatorsOptions();

    // Coord 设定同步
    this.updateCoordOptions();
  }

  /**
   * 获取 观测时间
   * 
   * @return {JDateRepository} 观测时间
   */
  get time() {
    return this.private.time;
  }

  /**
   * 设置 天球坐标处理组件
   * 
   * @param {Coord} value 天球坐标处理组件
   */
  get coordHandler() {
    return this.private.Coord;
  }

  /**
   * 设定 观测时间
   * 
   * @param  {JDateRepository} time 观测时间对象
   * 
   * @return {Locator}              返回 this 引用
   */
  atTime(time) {
    this.time = time;

    return this;
  }

  /**
   * 修正项启用
   * 
   * @param  {Number}  options.nutation         章动
   * @param  {Number}  options.lightTime        光行时
   * @param  {Number}  options.annualAberration 周年光行差
   * @param  {Number}  options.annualParallax   周年视差
   * @param  {Number}  options.atmRefraction    大气折射
   * @param  {Number}  options.graDeflection    引力偏转
   * @param  {Number}  options.fk5              FK5偏差
   * 
   * @return {Locator}                          返回 this 引用
   */
  withCorrections({
    nutation, 
    lightTime, 
    annualAberration, 
    annualParallax, 
    atmRefraction, 
    graDeflection, 
    fk5, 
  }) {
    if (nutation !== undefined) this.private.corrections.nutation = Number(nutation);
    if (annualAberration !== undefined) this.private.corrections.annualAberration = Number(annualAberration); 
    if (annualParallax !== undefined) this.private.corrections.annualParallax = Number(annualParallax); 
    if (atmRefraction !== undefined) this.private.corrections.atmRefraction = Number(atmRefraction); 
    if (graDeflection !== undefined) this.private.corrections.graDeflection = Number(graDeflection); 
    if (fk5 !== undefined) this.private.corrections.fk5 = Number(fk5); 
    if (lightTime !== undefined) {
      this.private.corrections.lightTime = Number(lightTime);
      this.updateLocatorsOptions();
    }
    
    // Coord 设定同步
    this.updateCoordOptions();

    return this;
  };

  /**
   * 配置坐标设定
   * 
   * @param  {String}  options.system       天球坐标系统
   * @param  {String}  options.centerMode   中心模式
   * @param  {Boolean} options.isContinuous 数值是否连续
   * 
   * @return {Locator}                      返回 this 引用
   */
  useCoordSetting({
    system, 
    centerMode, 
    isContinuous, 
  }) {
    if (system !== undefined) this.private.coordSetting.system = String(system);
    if (centerMode !== undefined) this.private.coordSetting.centerMode = String(centerMode);
    if (isContinuous !== undefined) this.private.coordSetting.isContinuous = Boolean(isContinuous);

    return this;
  }

  /**
   * 配置计算设定
   * 
   * @param  {String}  options.accuracy 精度等级
   * 
   * @return {Locator}                  返回 this 引用
   */
  useCalculateSetting({
    accuracy,
  }) {
    // 精度等级设定
    if (accuracy !== undefined) {
      this.private.calculate.accuracy = accuracy;

      for (let id in this.private.Locators) {
        let locator = this.private.Locators[id];
        if (locator.Calculator) locator.Calculator.accuracy = accuracy;
      }
    }

    return this;
  }

  /**
   * 获取 星体定位器
   * 
   * @param  {String}           id 星体id
   * 
   * @return {CelestialLocator}    星体定位器
   */
  getLocator(id) {
    if (id === 'fixed') return this.private.FixedStarLocator;
    return this.private.Locators[id];
  }

  /**
   * 注册 星体定位器
   * 
   * @param  {String}           id      星体id
   * @param  {CelestialLocator} locator 星体定位器
   * 
   * @return {Locator}                  返回 this 引用
   */
  registerLocator(id, locator) {
    if (typeof(id) !== 'string') throw Error('The param id should be a String.');
    if (!(locator instanceof CelestialLocator)) throw Error('The param locator should be an instance of CelestialLocator');

    let options = {
      time: this.private.time,
      withLTE: this.private.corrections.lightTime === 3,
    };

    locator.options(options);
    
    this.private.Locators[id] = locator;

    return this;
  }

  /**
   * 移除 星体定位器
   * 
   * @param  {String}  id 星体id
   * 
   * @return {Locator}    返回 this 引用
   */
  removeLocator(id) {
    if (typeof(id) !== 'string') throw Error('The param id should be a String.');

    delete this.private.starCategory[id];

    return this;
  }

  /**
   * 注册恒星数据
   * 
   * @param  {String}  options.id       恒星id
   * @param  {Number}  options.ra       J2000 平赤经，单位：°
   * @param  {Number}  options.dec      J2000 平赤纬，单位：°
   * @param  {Number}  options.parallax 周年视差，单位：角秒
   * @param  {Number}  options.pmra     赤经自行，单位：角秒每儒略年
   * @param  {Number}  options.pmdec    赤纬自行，单位：角秒每儒略年
   * @param  {Number}  options.radvel   日心视向速度，单位：km/s
   * 
   * @return {Locator}                  返回 this 引用
   */
  registerStar({
    id, 
    ra, 
    dec, 
    parallax, 
    pmra, 
    pmdec, 
    radvel,
  }) {
    if (typeof(id) !== 'string') throw Error('The param id should be a String.');

    this.private.starCategory[id] = [
      ra, 
      dec, 
      parallax, 
      pmra, 
      pmdec, 
      radvel,
    ];

    return this;
  }

  /**
   * 移除恒星数据
   * 
   * @param  {String}  id 恒星id
   * 
   * @return {Locator}    返回 this 引用
   */
  removeStar(star_id) {
    if (typeof(id) !== 'string') throw Error('The param id should be a String.');

    delete this.private.starCategory[id];

    return this;
  }

  /**
   * 清空注册星表
   * 
   * @return {Locator} 返回 this 引用
   */
  clearStarCategory() {
    this.private.starCategory = {};

    return this;
  }

  /**
   * 设置 结果天球坐标处理回调函数
   * 
   * @param {Function} func 结果天球坐标处理回调函数
   */
  set afterResultProcessed(func) {
    if (func && typeof(func) !== 'function') throw Error('The param func existed should be a Function.');

    this.private.afterResultProcessed = func;
  }

  /**
   * 设置 结果天球坐标处理回调函数
   * 
   * @param  {Function} func 结果天球坐标处理回调函数
   * 
   * @return {Locator}       返回 this 引用
   */
  setAfterResultProcessed(func) {
    this.afterResultProcessed = func;

    return this;
  }

  /**
   * 结果集处理
   * 
   * @param  {CommonCoordinate} result   待处理的天球坐标
   * @param  {Function}         callback 回调函数
   * 
   * @return {CommonCoordinate}          处理后的天球坐标
   */
  resultProcess(result, callback) {
    let options = {
      epoch: this.private.time,
      centerMode: this.private.coordSetting.centerMode,
      isContinuous: this.private.coordSetting.isContinuous,
      withNutation: (this.private.corrections.nutation & 2) === 2,
      withAnnualAberration: (this.private.corrections.annualAberration & 2) === 2,
      withGravitationalDeflection: (this.private.corrections.graDeflection & 2) === 2,
      withAR: (this.private.corrections.atmRefraction & 2) === 2,
      onFK5: (this.private.corrections.fk5 & 2) === 2,
    };
    let afterResultProcessed = callback || this.private.afterResultProcessed;
    let sys = this.private.coordSetting.system;

    let CoordHandler = this.private.Coord;

    result.coord.on(options);

    result.coord = CoordHandler.transform(result.coord).to(sys, options);

    // 回调处理
    if (afterResultProcessed && typeof(afterResultProcessed) === 'function') result = afterResultProcessed(result);

    return result;
  }

  /**
   * 获取星体定位结果
   * 
   * @param  {String}   star_id              星体id
   * @param  {Function} afterResultProcessed 坐标处理回调函数
   * 
   * @return {Mixed}                         定位结果
   */
  get(star_id, afterResultProcessed) {

    let res;

    if (star_id in this.private.Locators) { // 非恒星处理
      let locator = this.private.Locators[star_id];
      res = locator.get();
    } else if (star_id in this.private.starCategory) { // 恒星处理
      let item = this.private.starCategory[star_id];
      let locator = this.private.FixedStarLocator;
      res = locator.get({
        id: star_id,
        ra: item[0],
        dec: item[1],
        parallax: item[2],
        pmra: item[3],
        pmdec: item[4],
        radvel: item[5],
      });
    }

    res = this.resultProcess(res, afterResultProcessed);

    return res;
  }

  /**
   * 获取全部星体定位表
   *
   * @param  {Function} afterResultProcessed 坐标处理回调函数
   * 
   * @return {Object}                        全部星体定位表
   */
  getAll(afterResultProcessed) {
    let res = {};

    for (let id in this.private.Locators) {
      let coord = this.private.Locators[id].get();
      res[id] = this.resultProcess(coord, afterResultProcessed);
    }

    for (let id in this.private.starCategory) {
      let locator = this.private.FixedStarLocator;
      let item = this.private.starCategory[id];

      let coord = locator.get({
        id,
        ra: item[0],
        dec: item[1],
        parallax: item[2],
        pmra: item[3],
        pmdec: item[4],
        radvel: item[5],
      });

      res[id] = this.resultProcess(coord, afterResultProcessed);
    }

    return res;
  }

}

module.exports = Locator;
