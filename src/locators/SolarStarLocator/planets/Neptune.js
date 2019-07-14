'use strict';

const EarthCalculator = require('../../../calculators/SolarPlanetsCalculator/planets/Earth');
const NeptuneCalculator = require('../../../calculators/SolarPlanetsCalculator/planets/Neptune');
const SolarStarLocator = require('../SolarStarLocator');
const LightTimeEffect = require('../LightTimeEffect');

/**
 * NeptuneLocator
 * 
 * 海王星坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class NeptuneLocator extends SolarStarLocator {

  /**
   * 构造函数
   * 
   * @param {Boolean} options 定位参数项
   */
  constructor(options = {}) {
    super();

    // 初始化参数
    this.private.id = 'neptune';

    // 构造海王星日心黄经坐标计算对象
    this.Calculator = new NeptuneCalculator;

    // 构造光行时计算对象
    this.LightTimeEffect = new LightTimeEffect({
      originPositionProvider: new EarthCalculator,
      planetPositionProvider: new NeptuneCalculator,
    });

    this.options(options);
  }
}

module.exports = NeptuneLocator;
