'use strict';

const CelestialLocator = require('./CelestialLocator');
const Coord = require('../Coord');
const NewtonSolver = require('../math/UnaryToolkit/NewtonSolver');
const CelestialVelocity = require('../velocity/CelestialVelocity');
const JDateRepository = require('../time/JDate/JDateRepository');

/**
 * OrbitSystemCrossLocator
 *
 * 星体轨道与天球系统交点定位器
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class OrbitSystemCrossLocator extends CelestialLocator {

  /**
   * 构造函数
   * 
   * @param  {Object} options 定位器计算参数
   */
  constructor(options = {}) {
    super(options);

    this.private = {
      ...this.private,
      id: 'orbit_sys_cross',
      time: new JDateRepository,
      direction: true,
      coordHandler: new Coord, 
    }

    this.options(options);
  }

  /**
   * 设置定位器计算参数
   * 
   * @param  {String}                  options.id           位置id
   * @param  {JDateRepository}         options.time         儒略时间对象
   * @param  {CelestialLocator}        options.orbit        轨道坐标定位器
   * @param  {String}                  options.sys          天球系统
   * @param  {Boolean}                 options.direction    交点方向
   * @param  {Coord}                   options.coordHandler 天球坐标控制器
   * 
   * @return {OrbitSystemCrossLocator}                      返回 this 引用
   */
  options({
    id,
    time,
    orbit,
    sys,
    direction,
    coordHandler,
  } = {}) {
    if (id !== undefined) this.id = id;
    if (coordHandler !== undefined) this.coordHandler = coordHandler;
    if (time !== undefined) this.time = time;
    if (orbit !== undefined) this.orbit = orbit;
    if (sys !== undefined) this.sys = sys;
    if (direction !== undefined) this.direction = direction;

    return this;
  }

  /**
   * 获取计算结果
   * 
   * @param  {Object} options 定位器计算参数
   * 
   * @return {Object}         计算结果集
   */
  get(options = {}) {

    this.options(options);

    // 声明变量
    let orbit = this.orbit,
        sys = this.sys,
        direction =  this.direction,
        jd0 = orbit.time.JD,
        coord,
        coordHandler = this.private.coordHandler;

    // 构造用于求解的一元函数
    let f = function(jd) {
      let jdate = new JDateRepository(jd);
      orbit.time = jdate;
      coord = orbit.get().coord;
      
      let res = (sys === 'ecc') ? coord.on(coordHandler.options) : coordHandler.transform(coord).to(sys, coordHandler.options);
      
      return res.latitude.getDegrees();
    }

    // 实例化 天球速度计算组件
    let CV = new CelestialVelocity(orbit);

    // 设定天球系统参数
    CV.celestial(sys, coordHandler.options);

    // 获取初始时间点在目标天球系统下的球坐标速度
    let vel_v = CV.get({ t: jd0 });

    // 绕行周期。单位：儒略日
    let T = Math.PI * 2 / vel_v.phi;

    // 五分间距。单位：儒略日
    let t5 = T / 5;

    let minJD,
        minB = 10;

    // 遍历五个均分节点。
    for (var i = 0; i < 5; i++) {
      // 时间偏移。单位：儒略日。
      let dt = (i - 2) * t5,
          jd = jd0 + dt,
          theta_v = CV.get({ t: jd }).theta;
      // 上升点条件：
      // v纬度i > 0
      // min(i) = |纬度i|
      // 下降点条件：
      // v纬度i < 0
      // min(i) = |纬度i|
      if (direction == (theta_v > 0)) {
        // 计算纬度。单位：弧度。
        let b = Math.abs(f(jd));

        // 检查最小值，并且更新。
        if (b < minB) {
          minB = b;
          minJD = jd;
        }
      }
    }

    // 构建牛顿线性求解器
    let NLSolver = new NewtonSolver({
      f,
      dx: 0.00001,
      bias: 0.00001,
    });

    // 执行求解
    NLSolver.solve(minJD);

    return {
      id: this.id,
      time: this.time,
      coord, // 交点坐标
      direction, // 相交方向（升、降）
      crossTime: new JDateRepository(NLSolver.x),  // 相交时间
    };
  }


  /**
   * 设置 轨道坐标定位器
   * 
   * @param {CelestialLocator} value 轨道坐标定位器
   */
  set orbit(value) {
    if (!(value instanceof CelestialLocator)) throw Error('The param value should be a CelestialLocator.');
    this.private.orbit = value;
  }

  /**
   * 获取 轨道坐标定位器
   * 
   * @return {CelestialLocator} 轨道坐标定位器
   */
  get orbit() {
    return this.private.orbit;
  }

  /**
   * 设置 天球系统
   * 
   * @param {String} value 天球系统
   */
  set sys(value) {
    this.private.sys = value;
  }

  /**
   * 获取 天球系统
   * 
   * @return {String} 天球系统
   */
  get sys() {
    return this.private.sys;
  }

  /**
   * 设置 天球坐标处理组件
   * 
   * @param {Coord} value 天球坐标处理组件
   */
  set coordHandler(value) {
    if (!(value instanceof Coord)) throw Error('The param value should be an instance of Coord.');

    this.private.coordHandler = value;
  }

  /**
   * 获取 天球坐标处理组件
   * 
   * @return {Coord} 天球坐标处理组件
   */
  get coordHandler() {
    return this.private.coordHandler;
  }

  /**
   * 设置 相交方向
   *
   * true 为上升。false 为下降。
   * 
   * @param {Boolean} value 相交方向
   */
  set direction(value) {
    this.private.direction = !! value;
  }

  /**
   * 获取 相交方向
   * 
   * @return {Boolean} 相交方向
   */
  get direction() {
    return this.private.direction;
  }
}

module.exports = OrbitSystemCrossLocator;
