'use strict';

const JDateRepository = require('../../time/JDate/JDateRepository');

/**
 * LightTimeEffect
 *
 * 光行时作用计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class LightTimeEffect {

  /**
   * 构造函数
   * 
   * @param {JDateRepository} options.time                   观测儒略时间
   * @param {Object}          options.originPositionProvider 原点位置提供组件
   * @param {Object}          options.planetPositionProvider 行星位置提供组件
   * @param {Number}          options.accuracy               计算精度，单位：儒略日
   */
  constructor({
    time,
    originPositionProvider,
    planetPositionProvider,
    accuracy,
  }) {
    this.private = {};

    this.OriginPositionProvider = originPositionProvider;
    this.PlanetPositionProvider = planetPositionProvider;

    this.time = time ? time : new JDateRepository;
    this.accuracy = accuracy || 0.00001; // 默认精度 < 1秒
  }

  /**
   * 设置 观测儒略时间
   * 
   * @param {JDateRepository} value 观测儒略时间
   */
  set time(value) {
    if (!(value instanceof JDateRepository)) throw Error('The param value should be an instance of JDateRepository.');

    this.private.time = value;
  }

  /**
   * 获取 观测儒略时间
   * 
   * @return {JDateRepository} 观测儒略时间
   */
  get time() {
    return this.private.time;
  }

  /**
   * 设置 计算精度，单位：儒略日
   * 
   * @param {Number} value 计算精度
   */
  set accuracy(value) {
    if (typeof(value) !== 'number') throw Error('The param value should be a Number.');
    if (value <= 0) throw Error('The param value should be greater 0.');

    this.private.accuracy = value;
  }

  /**
   * 获取 计算精度
   * 
   * @return {Number} 计算精度
   */
  get accuracy() {
    return this.private.accuracy;
  }

  /**
   * 计算光行时
   * 
   * @return {Object} 返回结果对象
   */
  calc() {
    let JDate = this.time,
        OriginPositionProvider = this.OriginPositionProvider,
        PlanetPositionProvider = this.PlanetPositionProvider;

    OriginPositionProvider.obTime = new JDateRepository(JDate.JD);
    PlanetPositionProvider.obTime = new JDateRepository(JDate.JD);

    // 获取直角坐标
    let dist = 0,
        lt = 0,
        accuracy = this.accuracy,
        RC0 = OriginPositionProvider.sc.toRC(),
        delta_lt = 0;

    do {
      // 计算行星视位置
      let RC1 = PlanetPositionProvider.rc ? PlanetPositionProvider.rc : PlanetPositionProvider.sc.toRC();

      // 计算距离
      let x = RC1.x - RC0.x,
          y = RC1.y - RC0.y,
          z = RC1.z - RC0.z;
      dist = Math.sqrt(x * x + y * y + z * z);

      // 计算当前光行时间，单位：儒略日
      let lt_new = 0.0057755183 * dist;
      delta_lt = lt_new - lt;

      // 计算当前行星视时刻
      lt = lt_new;
      let t = new JDateRepository(JDate.JD - lt);
      PlanetPositionProvider.obTime = t;
    } while(Math.abs(delta_lt) > accuracy);

    return {
      sc: PlanetPositionProvider.sc ? PlanetPositionProvider.sc : PlanetPositionProvider.rc.toSC(),
      time: PlanetPositionProvider.obTime,
      lt,
    };
  }
}

module.exports = LightTimeEffect;
