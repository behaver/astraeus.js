'use strict';

const CelestialLocator = require('./CelestialLocator');
const EquinoctialCoordinate = require('../coords/EquinoctialCoordinate');
const DynamicCalculator = require('../calculators/FixedStarCalculator/TrigonometricCalculator');
const TrigonometricCalculator = require('../calculators/FixedStarCalculator/TrigonometricCalculator');
const JDateRepository = require('../time/JDate/JDateRepository');

/**
 * FixedStarLocator
 *
 * 用于计算恒星坐标的组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class FixedStarLocator extends CelestialLocator {

  /**
   * 构造函数
   * 
   * @param {Object} options 定位参数项
   */
  constructor(options = {}) {
    super();

    // 设置缺省参数
    this.private = {
      ...this.private,
      id: 'fixed',
      time: new JDateRepository,
      ra: 0,
      dec: 0,
      parallax: 0,
      pmra: 0,
      pmdec: 0,
      radvel: 0,
    }

    this.model = 'dyn';

    // 设定参数项
    this.options(options);
  }

  /**
   * 设置定位参数项
   *
   * @param  {String}           options.id       位置id
   * @param  {Number}           options.ra       J2000 平赤经，单位：°
   * @param  {Number}           options.dec      J2000 平赤纬，单位：°
   * @param  {Number}           options.parallax 周年视差，单位：角秒
   * @param  {Number}           options.pmra     赤经自行，单位：角秒每儒略年
   * @param  {Number}           options.pmdec    赤纬自行，单位：角秒每儒略年
   * @param  {Number}           options.radvel   日心视向速度，单位：km/s
   * @param  {JDateRepository}  options.time     儒略时间对象
   * @param  {String}           options.model    计算模型字串
   * 
   * @return {FixedStarLocator}                  返回 this 引用
   * 
   */
  options({
    id,
    ra,
    dec,
    parallax,
    pmra,
    pmdec,
    radvel,
    time,
    model,
  } = {}) {
    if (id !== undefined) this.id = id;
    if (ra !== undefined) this.ra = ra;
    if (dec !== undefined) this.dec = dec;
    if (parallax !== undefined) this.parallax = parallax;
    if (pmra !== undefined) this.pmra = pmra;
    if (pmdec !== undefined) this.pmdec = pmdec;
    if (radvel !== undefined) this.radvel = radvel;
    if (time !== undefined) this.time = time;
    if (model !== undefined) this.model = model;

    return this;
  }

  /**
   * 获取恒星赤道坐标对象
   * 
   * @param  {Object} options 定位参数项
   * 
   * @return {Object}         定位结果集
   */
  get(options = {}) {

    this.options(options);

    // 初始化变量
    let id = this.id,
        ra = this.ra,
        dec = this.dec,
        parallax = this.parallax,
        pmra = this.pmra,
        pmdec = this.pmdec,
        radvel = this.radvel,
        time = this.time,
        model = this.model;

    // 计算获取恒星赤道球坐标，结果修正了自行与周年视差
    let sc = this.Calculator.calc({
      ra,
      dec,
      parallax,
      pmra,
      pmdec,
      radvel,
    });

    // 实例化赤道坐标对象
    let coord = new EquinoctialCoordinate({
      sc,
      withAnnualAberration: false,
      withNutation: false,
    });

    // 修正岁差, 光行差, 章动
    coord.on({
      epoch: time, 
      withAnnualAberration: true,
      withNutation: true,
    });

    return {
      id,
      coord,
      time,
    };
  }

  /**
   * 设置 儒略时间对象
   * 
   * @param {JDateRepository} value 儒略时间对象
   */
  set time(value) {
    super.time = value;

    this.Calculator.epoch = value;
  }

  /**
   * 获取 儒略时间对象
   * 
   * @return {JDateRepository} 儒略时间对象
   */
  get time() {
    return this.private.time;
  }

  /**
   * 设置 计算模型
   * 
   * @param {String} value 计算模型缩写字串（dyn: 动力学模型, tri: 三角学模型）
   */
  set model(value) {
    // 参数检验
    if (typeof(value) !== 'string') throw Error('The param value should be a String.');
    
    value = value.toLowerCase();

    if (value === 'dyn') {
      if (this.private.model !== 'dyn') {
        this.Calculator = new DynamicCalculator(this.private.time);
        this.private.model = 'dyn';
      }
    } else if (value === 'tri') {
      if (this.private.model !== 'tri') {
        this.Calculator = new TrigonometricCalculator(this.private.time);
        this.private.model = 'tri';
      }
    } else {
      throw Error('The param value should be valid.');
    }
  }

  /**
   * 获取计算模型
   * 
   * @return {String} 计算模型缩写字串
   */
  get model() {
    return this.private.model;
  }

  /**
   * 设定 恒星 J2000 平赤经（单位：°）
   * 
   * @param {Number} value 恒星 J2000 平赤经（单位：°）
   */
  set ra(value) {
    if (typeof(value) !== 'number') throw Error('The param value should be a Number.');
  
    this.private.ra = value;
  }

  /**
   * 获取 恒星 J2000 平赤经（单位：°）
   * 
   * @return {Number} 恒星 J2000 平赤经（单位：°）
   */
  get ra() {
    return this.private.ra;
  }

  /**
   * 设定 恒星 J2000 平赤纬（单位：°）
   * 
   * @param {Number} value 恒星 J2000 平赤纬（单位：°）
   */
  set dec(value) {
    if (typeof(value) !== 'number') throw Error('The param value should be a Number.');
  
    this.private.dec = value;
  }

  /**
   * 获取 恒星 J2000 平赤纬（单位：°）
   * 
   * @return {Number} 恒星 J2000 平赤纬（单位：°）
   */
  get dec() {
    return this.private.dec;
  }

  /**
   * 设定 周年视差（单位：角秒）
   * 
   * @param {Number} value 周年视差（单位：角秒）
   */
  set parallax(value) {
    if (typeof(value) !== 'number') throw Error('The param value should be a Number.');
  
    this.private.parallax = value;
  }

  /**
   * 获取 周年视差（单位：角秒）
   * 
   * @return {Number} 周年视差（单位：角秒）
   */
  get parallax() {
    return this.private.parallax;
  }

  /**
   * 设定 赤经自行（单位：角秒每儒略年）
   * 
   * @param {Number} value 赤经自行（单位：角秒每儒略年）
   */
  set pmra(value) {
    if (typeof(value) !== 'number') throw Error('The param value should be a Number.');
  
    this.private.pmra = value;
  }

  /**
   * 获取 赤经自行（单位：角秒每儒略年）
   * 
   * @return {Number} 赤经自行（单位：角秒每儒略年）
   */
  get pmra() {
    return this.private.pmra;
  }

  /**
   * 设定 赤纬自行（单位：角秒每儒略年）
   * 
   * @param {Number} value 赤纬自行（单位：角秒每儒略年）
   */
  set pmdec(value) {
    if (typeof(value) !== 'number') throw Error('The param value should be a Number.');
  
    this.private.pmdec = value;
  }

  /**
   * 获取 赤纬自行（单位：角秒每儒略年）
   * 
   * @return {Number} 赤纬自行（单位：角秒每儒略年）
   */
  get pmdec() {
    return this.private.pmdec;
  }

  /**
   * 设定 日心视向速度（单位：km/s）
   * 
   * @param {Number} value 日心视向速度（单位：km/s）
   */
  set radvel(value) {
    if (typeof(value) !== 'number') throw Error('The param value should be a Number.');
  
    this.private.radvel = value;
  }

  /**
   * 获取 日心视向速度（单位：km/s）
   * 
   * @return {Number} 日心视向速度（单位：km/s）
   */
  get radvel() {
    return this.private.radvel;
  }
}

module.exports = FixedStarLocator;
