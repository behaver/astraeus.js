import SphericalCoordinate3D from '../math/Coordinate/3d/SphericalCoordinate3D';
import SiderealTime from '../time/SiderealTime';
import Angle from '../math/angle';

const angle = new Angle;

/**
 * DiurnalParallax
 *
 * 有关天体的周日视差的计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class DiurnalParallax {

  /**
   * 构造函数
   * 
   * @param {SphericalCoordinate3D} options.gc           地心球坐标
   * @param {SphericalCoordinate3D} options.tc           站心球坐标
   * @param {Number}                options.obGeoLat     观测位置地理纬度，单位：度，值域：[-90, 90]
   * @param {SiderealTime}          options.siderealTime 观测位置的当地真恒星时对象
   * @param {Number}                options.elevation    观测位置海拔高度，单位：米，值域：[-12000, 3e7]
   */
  constructor(options) {
    if (options.constructor !== Object) throw Error('The param options should be a Object.');

    this.consts = {
      AU: 1.49597870691e8, // 天文单位长度(千米)
    }
    this.private = {};
    this.position = {};

    this.init(options);
  }

  /**
   * 初始化周日视差计算条件
   * 
   * @param  {SphericalCoordinate3D} options.gc           地心球坐标
   * @param  {SphericalCoordinate3D} options.tc           站心球坐标
   * @param  {Number}                options.obGeoLat     观测位置地理纬度，单位：度，值域：[-90, 90]
   * @param  {Number}                options.obElevation  观测位置海拔高度，单位：米，值域：[-12000, 3e7]
   * @param  {SiderealTime}          options.siderealTime 观测位置的当地真恒星时对象
   * @param  {String}                options.system       坐标系统
   * 
   * @return {DiurnalParallax}                            返回 this 引用
   */
  init({
    gc,
    tc,
    obGeoLat,
    obElevation,
    siderealTime,
    system,
  }) {
    // 参数预处理
    if (obElevation === undefined) obElevation = 0;
    else if (typeof(obElevation) !== 'number') throw Error('The param obElevation should be a Number.');
    else if (obElevation > 3e7 || obElevation < -12000) throw Error('The param obElevation should be in (-12000, 3e7).');

    if (siderealTime === undefined) throw Error('The param siderealTime should be defined.');
    else if (!(siderealTime instanceof SiderealTime)) throw Error('The param siderealTime should be a SiderealTime.');
    
    if (typeof(obGeoLat) !== 'number') throw Error('The param obGeoLat should be defined and be a Number.');
    else if (obGeoLat < -90 || obGeoLat > 90) throw Error('The param obGeoLat should be in [-90, 90].');

    if (system === undefined) system = 'equinoctial';
    else if (typeof(system) !== 'string') throw Error('The param system should be a String.');
    else if (system !== 'equinoctial' && system !== 'horizontal') throw Error('The param system should be equinoctial or horizontal.');

    this.private = {
      obGeoLat,
      obElevation,
      siderealTime,
      system,
    }

    if (gc !== undefined) this.GC = gc;
    else if (tc !== undefined) this.TC = tc;
    else throw Error('One of the params gc and tc should be defined.');

    return this;
  }

  /**
   * 计算视差直角坐标偏移值
   *
   * @private
   * @return {Object} 视差直角坐标偏移值对象
   */
  calcCorrections() {
    // 地球赤道半径(千米)
    const EAR = 6378.1366; 

    // 地球平均半径
    const mER = 6371.393;

    // 地球极赤半径比
    const PER = 0.99664719

    // 初始计算球坐标
    // 计算模型的标准为地心坐标，当其为站心坐标时会产生一定误差，但其大小可以忽略
    let sc = (this.private.centerMode === 'topocentric') ? this.position.tc : this.position.gc;

    // 地理纬度，单位：弧度
    let geographicLat = angle.setDegrees(this.private.obGeoLat).getRadian();

    // 地心纬度，单位：弧度
    let geocentricLat = Math.atan(PER * Math.tan(geographicLat));

    // 海拔高度，单位：千米
    let obElevation = this.private.obElevation / 1000;

    // 空间直角坐标系下周日视差的各轴修正值结果，单位：千米
    let corrections;

    if (this.private.system === 'equinoctial') {
      // 真恒星时，单位：弧度
      let TST = angle.setSeconds(this.private.siderealTime.trueVal).getRadian();

      // 站心与地心向径的赤道平面投影长度，单位：千米
      let r = mER * Math.cos(geocentricLat) + obElevation * Math.cos(geographicLat);
      
      corrections = {
        x: r * Math.cos(TST),
        y: r * Math.sin(TST),
        z: EAR * Math.sin(geocentricLat) * PER + obElevation * Math.sin(geographicLat),
      }
    } else if (this.private.system === 'horizontal') {
      // 地理纬度与地心纬度间的差角，单位：弧度
      let theta = geographicLat - geocentricLat;

      corrections = {
        x: EAR * Math.sin(theta),
        y: 0,
        z: EAR * Math.cos(theta) + obElevation,
      }
    }

    return corrections;
  }

  /**
   * 设置站心球坐标对象
   *
   * 规定参数球坐标中 r 值单位为：AU 
   * 
   * @param {SphericalCoordinate3D} tc 站心球坐标对象
   */
  set TC(tc) {
    if (tc === undefined) throw Error('The param tc should be defined.');
    else if (!(tc instanceof SphericalCoordinate3D)) throw Error('The param tc should be a SphericalCoordinate3D.');

    this.private.centerMode = 'topocentric';

    this.position = {
      tc: new SphericalCoordinate3D(tc.r * this.consts.AU, tc.theta, tc.phi),
    };
  }

  /**
   * 获取站心球坐标对象
   *
   * @return {Object} 站心球坐标对象
   */
  get TC() {
    if (this.position.tc === undefined) {
      // 地心坐标 转 站心坐标 过程：
      let corrections = this.calcCorrections();
      let gc = this.position.gc.equal();
      this.position.tc = new SphericalCoordinate3D(gc.r, gc.theta, gc.phi);
      this.position.tc.translate(-corrections['x'], -corrections['y'], -corrections['z']);
    }

    let tc = this.position.tc.equal();

    return new SphericalCoordinate3D(tc.r / this.consts.AU, tc.theta, tc.phi);
  }

  /**
   * 设置地心球坐标对象
   *
   * 规定参数球坐标中 r 值单位为：AU 
   * 
   * @param {SphericalCoordinate3D} gc 地心球坐标对象
   */
  set GC(gc) {
    if (gc === undefined) throw Error('The param gc should be defined.');
    else if (!(gc instanceof SphericalCoordinate3D)) throw Error('The param gc should be a SphericalCoordinate3D.');

    this.private.centerMode = 'geocentric';

    this.position = {
      gc: new SphericalCoordinate3D(gc.r * this.consts.AU, gc.theta, gc.phi),
    };
  }

  /**
   * 获取地心球坐标对象
   *
   * @return {Object} 地心球坐标对象
   */
  get GC() {
    if (this.position.gc === undefined) {
      // 站心坐标 转 地心坐标 过程：
      let corrections = this.calcCorrections();
      let tc = this.position.tc.equal();
      this.position.gc = new SphericalCoordinate3D(tc.r, tc.theta, tc.phi);
      this.position.gc.translate(corrections['x'], corrections['y'], corrections['z']);
    }

    let gc = this.position.gc.equal();

    return new SphericalCoordinate3D(gc.r / this.consts.AU, gc.theta, gc.phi);
  }
}

export default DiurnalParallax;