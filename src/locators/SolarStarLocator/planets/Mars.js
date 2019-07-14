'use strict';

const EarthCalculator = require('../../../calculators/SolarPlanetsCalculator/planets/Earth');
const MarsCalculator = require('../../../calculators/SolarPlanetsCalculator/planets/Mars');
const SolarStarLocator = require('../SolarStarLocator');
const LightTimeEffect = require('../LightTimeEffect');

/**
 * MarsLocator
 * 
 * 火星坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class MarsLocator extends SolarStarLocator {

  /**
   * 构造函数
   * 
   * @param {Boolean} options 定位参数项
   */
  constructor(options = {}) {
    super();

    // 初始化参数
    this.private.id = 'mars';

    // 构造火星日心黄经坐标计算对象
    this.Calculator = new MarsCalculator;

    // 构造光行时计算对象
    this.LightTimeEffect = new LightTimeEffect({
      originPositionProvider: new EarthCalculator,
      planetPositionProvider: new MarsCalculator,
    });

    this.options(options);
  }
}

module.exports = MarsLocator;
