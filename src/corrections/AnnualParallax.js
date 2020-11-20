import EarthSSBCalculator from '../calculators/EarthSSBCalculator';

/**
 * AnnualParallax
 * 
 * 周年视差计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class AnnualParallax {
  
  /**
   * 构造函数
   * 
   * @param {JDateRepository}       options.time   计算时间
   * @param {String}                options.system 坐标系统
   * @param {SphericalCoordinate3D} options.sc     天体球坐标 (含自行但不含章动和光行差)
   */
  constructor({
    time,
    system,
    sc,
  }) {
    this.EP = new EarthSSBCalculator(time);
    this.system = system ? system : 'equinoctial';
    this.sc = sc;
  }

  /**
   * 获取周年视差
   * 
   * @return {Object} 周年视差结果对象
   */
  get() {
    // 获取地球 SSB 位置变量
    let EPVectory = this.EP.vector;

    // 由 J2000 赤道坐标旋转至 J2000 黄道坐标
    if (this.system.toLowerCase() === 'ecliptic') EPVectory.rotateX(-0.40906462779619485);

    let A = this.sc.phi,
        B = Math.PI / 2 - this.sc.theta,
        R = this.sc.r,
        cosA = Math.cos(A),
        sinA = Math.sin(A),
        cosB = Math.cos(B),
        sinB = Math.sin(B),
        x = EPVectory.x,
        y = EPVectory.y,
        z = EPVectory.z;

    let delta_A = (y * cosA - x * sinA) / -R / cosB,
        delta_B = - ((x * cosA + y * sinA) * sinB - z * cosB) / -R;

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
    return this.EP.time;
  }

  /**
   * 设置计算时间
   * 
   * @param  {JDateRepository} time 计算时间
   */
  set time(time) {
    this.EP.time = time;
  }
}

export default AnnualParallax;