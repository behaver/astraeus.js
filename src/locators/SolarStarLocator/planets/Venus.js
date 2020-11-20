import EarthCalculator from '../../../calculators/SolarPlanetsCalculator/planets/Earth';
import VenusCalculator from '../../../calculators/SolarPlanetsCalculator/planets/Venus';
import SolarStarLocator from '../SolarStarLocator';
import LightTimeEffect from '../LightTimeEffect';

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

export default VenusLocator;