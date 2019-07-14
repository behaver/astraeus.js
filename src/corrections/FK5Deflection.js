'use strict';

const SphericalCoordinate3D = require('../math/Coordinate/3d/SphericalCoordinate3D');
const Precession = require('./Precession');
const Angle = require('../math/angle');

const angle = new Angle;

/**
 * FK5Deflection
 *
 * 用于计算 VSOP 动力学坐标与 FK5 坐标之间的偏差的组件
 * 
 * @author 董 三碗 <qianxing@yeah.net>
 */
class FK5Deflection {

  /**
   * 构造函数
   * 
   * @param {JDateRepository}       options.time   计算时间
   * @param {SphericalCoordinate3D} options.sc     天体球坐标
   * @param {String}                options.system 坐标系统
   */
  constructor({
    time,
    sc,
    system,
  }) {
    this.sc = sc;
    this.Precession = new Precession({
      epoch: time,
    });
    this.system = system ? system : 'equinoctial';
  }

  /**
   * 获取 引力偏转值
   * 
   * @return {Object} 引力偏转值对象
   */
  get() {
    let e0 = angle.setSeconds(this.Precession.epsilon).getRadian();

    if (this.system === 'ecliptic') {
      var sc = this.sc;
    } else if (this.system === 'equinoctial') {
      // 旋转赤道坐标 至 黄道坐标
      var sc = new SphericalCoordinate3D(this.sc.r, this.sc.theta, this.sc.phi);
      sc.rotateX(-e0);
    }

    let time = this.time,
        l1 = angle.setRadian(sc.phi).getDegrees() - 1.397 * time.JDEC - 0.00031 * time.JDECP(2),
        l1_radian = angle.setDegrees(l1).getRadian(),
        b_radian = Math.PI / 2 - sc.theta,
        delta_l = - 0.09033 + 0.03916 * (Math.cos(l1_radian) + Math.sin(l1_radian)) * Math.tan(b_radian),
        delta_b = 0.03916 * (Math.cos(l1_radian) - Math.sin(l1_radian)),
        a = angle.setSeconds(delta_l).getRadian(),
        b = angle.setSeconds(delta_b).getRadian();

    if (this.system === 'equinoctial') {
      sc.phi += a;
      sc.theta -= b;

      // 旋转回至赤道坐标
      sc.rotateX(e0);

      return {
        a: sc.phi - this.sc.phi,
        b: this.sc.theta - sc.theta,
      };
    } else if (this.system === 'ecliptic') {
      return { a, b };
    }
  }

  /**
   * 获取计算时间
   * 
   * @return {JDateRepository} 计算时间
   */
  get time() {
    return this.Precession.epoch;
  }

  /**
   * 设置计算时间
   * 
   * @param {JDateRepository} time 计算时间
   */
  set time(time) {
    this.Precession.epoch = time;
  }
}

module.exports = FK5Deflection;
