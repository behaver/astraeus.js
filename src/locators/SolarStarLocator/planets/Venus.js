'use strict';

const EarthCalculator = require('../../../calculators/SolarPlanetsCalculator/planets/Earth');
const VenusCalculator = require('../../../calculators/SolarPlanetsCalculator/planets/Venus');
const SolarStarLocator = require('../SolarStarLocator');
const LightTimeEffect = require('../LightTimeEffect');

/**
 * VenusLocator
 * 
 * 金星坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class VenusLocator extends SolarStarLocator {

  /**
   * 构造函数
   * 
   * @param {Boolean} options 定位参数项
   */
  constructor(options = {}) {
    super();

    // 初始化参数
    this.private.id = 'venus';

    // 构造金星日心黄经坐标计算对象
    this.Calculator = new VenusCalculator;

    // 构造光行时计算对象
    this.LightTimeEffect = new LightTimeEffect({
      originPositionProvider: new EarthCalculator,
      planetPositionProvider: new VenusCalculator,
    });

    this.options(options);
  }
}

module.exports = VenusLocator;
