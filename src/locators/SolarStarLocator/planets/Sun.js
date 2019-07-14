'use strict';

const EarthCalculator = require('../../../calculators/SolarPlanetsCalculator/planets/Earth');
const SolarStarLocator = require('../SolarStarLocator');
const LightTimeEffect = require('../LightTimeEffect');
const EclipticCoordinate = require('../../../coords/EclipticCoordinate');
const SphericalCoordinate3D = require('../../../math/Coordinate/3d/SphericalCoordinate3D');

/**
 * SunLocator
 * 
 * 太阳位置计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class SunLocator extends SolarStarLocator {

  /**
   * 构造函数
   * 
   * @param {Boolean} options 定位参数项
   */
  constructor(options = {}) {
    super();

    // 初始化参数
    this.private.id = 'sun';

    // 构造地球日心黄经坐标计算对象
    this.Calculator = new EarthCalculator;

    // 构造光行时计算对象
    this.LightTimeEffect = new LightTimeEffect({
      originPositionProvider: {
        sc: new SphericalCoordinate3D(0, 0, 0),        
      },
      planetPositionProvider: new EarthCalculator,
    });

    this.options(options);
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

    // 对称转换地球日心坐标为太阳地心坐标
    sc.phi = sc.phi + Math.PI;
    sc.theta = Math.PI - sc.theta;

  	let coord = new EclipticCoordinate({
      sc,
      centerMode: 'geocentric',
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
}

module.exports = SunLocator;
