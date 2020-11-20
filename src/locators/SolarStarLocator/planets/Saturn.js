import EarthCalculator from '../../../calculators/SolarPlanetsCalculator/planets/Earth';
import SaturnCalculator from '../../../calculators/SolarPlanetsCalculator/planets/Saturn';
import SolarStarLocator from '../SolarStarLocator';
import LightTimeEffect from '../LightTimeEffect';

/**
 * SaturnLocator
 * 
 * 土星坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class SaturnLocator extends SolarStarLocator {

  /**
   * 构造函数
   * 
   * @param {Boolean} options 定位参数项
   */
  constructor(options = {}) {
    super();

    // 初始化参数
    this.private.id = 'saturn';

    // 构造土星日心黄经坐标计算对象
    this.Calculator = new SaturnCalculator;

    // 构造光行时计算对象
    this.LightTimeEffect = new LightTimeEffect({
      originPositionProvider: new EarthCalculator,
      planetPositionProvider: new SaturnCalculator,
    });

    this.options(options);
  }
}

export default SaturnLocator;