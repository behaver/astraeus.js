import EarthCalculator from '../../../calculators/SolarPlanetsCalculator/planets/Earth';
import MercuryCalculator from '../../../calculators/SolarPlanetsCalculator/planets/Mercury';
import SolarStarLocator from '../SolarStarLocator';
import LightTimeEffect from '../LightTimeEffect';

/**
 * MercuryLocator
 * 
 * 水星坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class MercuryLocator extends SolarStarLocator {

  /**
   * 构造函数
   * 
   * @param {Boolean} options 定位参数项
   */
  constructor(options = {}) {
    super();

    // 初始化参数
    this.private.id = 'mercury';

    // 构造水星日心黄经坐标计算对象
    this.Calculator = new MercuryCalculator;

    // 构造光行时计算对象
    this.LightTimeEffect = new LightTimeEffect({
      originPositionProvider: new EarthCalculator,
      planetPositionProvider: new MercuryCalculator,
    });

    this.options(options);
  }
}

export default MercuryLocator;