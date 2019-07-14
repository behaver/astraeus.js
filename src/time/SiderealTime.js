'use strict';

const JDateRepository = require('./JDate/JDateRepository');
const CacheSpaceOnJDate = require('./JDate/CacheSpaceOnJDate');
const Precession = require('../corrections/Precession');
const Nutation = require('../corrections/Nutation');
const Angle = require('../math/Angle');

const angle = new Angle;

/**
 * SiderealTime
 *
 * 恒星时计算的组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class SiderealTime {

  /**
   * 构造函数
   * 
   * @param {JDateRepository} obTime 观测时间
   * @param {Number}          obGLon 观测经度, 单位：度
   */
  constructor(obTime, obGLon = 0) {
    if (!(obTime instanceof JDateRepository)) throw Error('The param obTime should be a instance of JDateRepository');
    if (typeof(obGLon) !== 'number') throw Error('The param obGLon should be a Number.');
    if (obGLon < -180 || obGLon > 180) throw Error('The param obGLon should be in [-180, 180]');

    this.precession = new Precession({
      epoch: obTime
    });

    this.nutation = new Nutation({
      epoch: obTime
    });

    this.obTime = obTime;
    this.obGLon = obGLon;

    this.cache = new CacheSpaceOnJDate(this.obTime);
  }

  /**
   * 获取 地球自转角(ERA)
   *
   * @return {Number} 地球自转角度，单位：角秒
   */
  get ERA() {
    if (!this.cache.has('ERA')) {
      let obl = angle.setDegrees(this.obGLon).getRadian();
      this.cache.ERA = angle.setRadian(2 * Math.PI * (0.7790572732640 + 1.00273781191135448 * (this.obTime.JD - 2451545.0)) - obl).inRound().getSeconds();
    }
    
    return this.cache.ERA;
  }

  /**
   * 获取 平恒星时
   * 
   * @return {Number} 平恒星时，单位：角秒
   */
  get meanVal() {
    if (!this.cache.has('meanVal')) {
      this.cache.meanVal = this.ERA + this.precession.z + this.precession.zeta;
    }
    
    return this.cache.meanVal;
  }

  /**
   * 获取 真恒星时
   * 
   * @return {Number} 真恒星时，单位：角秒
   */
  get trueVal() {
    if (!this.cache.has('trueVal')) {
      let e0 = angle.setSeconds(this.precession.epsilon).getRadian();
      let delta_e = angle.setMilliseconds(this.nutation.obliquity).getRadian();
      let delta_psi = angle.setMilliseconds(this.nutation.longitude).getRadian();

      // 赤经章动：Δψ * cos(ε)，式中 Δψ 是黄经章动，ε 是真黄赤交角
      let ra_nutation = angle.setRadian(delta_psi * Math.cos(e0 + delta_e)).getSeconds();

      this.cache.trueVal = this.meanVal + ra_nutation;
    }

    return this.cache.trueVal;
  }
}

module.exports = SiderealTime;
