'use strict';

const EarthSSBVelocity = require('../velocity/EarthSSBVelocity');

/**
 * AnnualAberration
 * 
 * 周年光行差计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class AnnualAberration {
  
  /**
   * 构造函数
   * 
   * @param {JDateRepository}       options.time   计算时间
   * @param {String}                options.system 坐标系统
   * @param {SphericalCoordinate3D} options.sc     天体球坐标
   */
  constructor({
    time,
    system,
    sc,
  }) {
    this.EV = new EarthSSBVelocity(time);
    this.system = system ? system : 'equinoctial';
    this.sc = sc;
  }

  /**
   * 获取周年光行差
   * 
   * @return {Object} 周年光行差结果对象
   */
  get() {
    // 获取地球 SSB 速度变量
    let EVVectory = this.EV.vector;

    // 由 J2000 赤道坐标旋转至 J2000 黄道坐标
    if (this.system.toLowerCase() === 'ecliptic') EVVectory.rotateX(-0.40906462779619485);

    let A = this.sc.phi,
        B = Math.PI / 2 - this.sc.theta,
        cosA = Math.cos(A),
        sinA = Math.sin(A),
        cosB = Math.cos(B),
        sinB = Math.sin(B),
        x = EVVectory.x,
        y = EVVectory.y,
        z = EVVectory.z,
        c = 17314463268.46569; // 光速

    let delta_A = (y * cosA - x * sinA) / c / cosB,
        delta_B = - ((x * cosA + y * sinA) * sinB - z * cosB) / c;

    return {
      a: delta_A,
      b: delta_B,
    }
  }

  /**
   * 获取计算时间
   * 
   * @return {JDateRepository} 计算时间
   */
  get time() {
    return this.EV.time;
  }

  /**
   * 设置计算时间
   * 
   * @param  {JDateRepository} time 计算时间
   */
  set time(time) {
    this.EV.time = time;
  }
}

module.exports = AnnualAberration;
