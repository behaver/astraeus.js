'use strict';

const CelestialLocator = require('../CelestialLocator');
const EclipticCoordinate = require('../../coords/EclipticCoordinate');
const JDateRepository = require('../../time/JDate/JDateRepository');

/**
 * SolarStarLocator
 * 
 * 太阳系行星定位器 
 * 
 * 公有父类
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class SolarStarLocator extends CelestialLocator {

  /**
   * 构造函数
   */
  constructor() {
    super();
    
    // 设置缺省参数
    this.private = {
      ...this.private,
      withLTE: false,
    }
  }

  /**
   * 设置定位参数项
   * 
   * @param  {JDateRepository}  options.time    儒略时间对象
   * @param  {Boolean}          options.withLTE 考虑光行时修正
   * 
   * @return {SolarStarLocator}                 返回 this 引用
   */
  options({
    time,
    withLTE,
  } = {}) {
    if (time !== undefined) this.time = time;
    if (withLTE !== undefined) this.withLTE = withLTE;
  }

  /**
   * 获取计算结果
   * 
   * @param  {Object} options 定位参数项
   * 
   * @return {Object}         定位结果集
   */
  get(options = {}) {

    this.options(options);

    let withLTE = this.withLTE;

    let sc = (withLTE) ? this.LightTimeEffect.calc().sc : this.Calculator.sc;

    let coord = new EclipticCoordinate({
      sc,
      centerMode: 'heliocentric',
      epoch: this.time,
      withNutation: false,
    });

    return {
      id: this.id,
      time: this.time,
      coord,
      withLTE,
    }
  }

  /**
   * 设置 儒略时间对象
   * 
   * @param {JDateRepository} value 儒略时间对象
   */
  set time(value) {
    this.Calculator.obTime = value;
    if (this.LightTimeEffect) this.LightTimeEffect.time = value; 
  }

  /**
   * 获取 儒略时间对象
   * 
   * @return {JDateRepository} 儒略时间对象
   */
  get time() {
    return new JDateRepository(this.Calculator.obTime.JD);
  }

  /**
   * 设置 是否考虑光行时影响
   * 
   * @param {Boolean} value 是否考虑光行时影响
   */
  set withLTE(value) {
    this.private.withLTE = !! value;
  }

  /**
   * 获取 是否考虑光行时影响
   * 
   * @return {Boolean} 是否考虑光行时影响
   */
  get withLTE() {
    return this.private.withLTE;
  }
}

module.exports = SolarStarLocator;
