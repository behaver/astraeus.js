import SphericalCoordinate3D from '../math/Coordinate/3d/SphericalCoordinate3D';
import EarthCalculator from '../calculators/SolarPlanetsCalculator/planets/Earth';
import Precession from './Precession';

/**
 * GravitationalDeflection
 *
 * 用于计算太阳引力所造成的光线偏转的组件
 * 
 * @author 董 三碗 <qianxing@yeah.net>
 */
class GravitationalDeflection {

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
    this.EarthCalculator = new EarthCalculator(time);
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
    let earth_hecc_sc = this.EarthCalculator.sc; // 地球日心黄道球坐标

    if (this.sc.r < earth_hecc_sc.r) return { a: 0, b: 0 }

    let sec_per_rad = 206264.80624709636,
        e0 = this.Precession.epsilon / sec_per_rad;

    if (this.system === 'ecliptic') {
      // 旋转坐标至赤道坐标
      var sc = new SphericalCoordinate3D(this.sc.r, this.sc.theta, this.sc.phi);
      sc.rotateX(e0);
    } else if (this.system === 'equinoctial') {
      var sc = this.sc;
    }

    let ra = sc.phi, // 天体赤道直角坐标
        dec = Math.PI / 2 - sc.theta, 
        sun_sc = new SphericalCoordinate3D(earth_hecc_sc.r, Math.PI - earth_hecc_sc.theta, earth_hecc_sc.phi + Math.PI).rotateX(e0), // 太阳地心赤道坐标
        sun_ra = sun_sc.phi,
        sun_dec = Math.PI / 2 - sun_sc.theta,
        d = ra - sun_ra,
        D = Math.sin(dec) * Math.sin(sun_dec) 
          + Math.cos(dec) * Math.cos(sun_dec) * Math.cos(d);
    
    D = 0.00407 * (1 / (1 - D) + D / 2) / sec_per_rad;
    
    let res = {
      a: D * (Math.cos(sun_dec) * Math.sin(d) / Math.cos(dec)),
      b: D * (Math.sin(dec) * Math.cos(sun_dec) * Math.cos(d) - Math.sin(sun_dec) * Math.cos(dec)),
    };

    if (this.system === 'ecliptic') {
      sc.theta -= res.b;
      sc.phi += res.a;

      // 旋转回至赤道坐标
      sc.rotateX(-e0);

      return {
        a: sc.phi - this.sc.phi,
        b: this.sc.theta - sc.theta,
      };
    } else if (this.system === 'equinoctial') {
      return res;
    }
  }

  /**
   * 获取计算时间
   * 
   * @return {JDateRepository} 计算时间
   */
  get time() {
    return this.EarthCalculator.obTime;
  }

  /**
   * 设置计算时间
   * 
   * @param  {JDateRepository} time 计算时间
   */
  set time(time) {
    this.EarthCalculator.obTime = time;
    this.Precession.epoch = time;
  }
}

export default GravitationalDeflection;