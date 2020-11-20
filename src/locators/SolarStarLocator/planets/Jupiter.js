import EarthCalculator from '../../../calculators/SolarPlanetsCalculator/planets/Earth';
import JupiterCalculator from '../../../calculators/SolarPlanetsCalculator/planets/Jupiter';
import SolarStarLocator from '../SolarStarLocator';
import LightTimeEffect from '../LightTimeEffect';

/**
 * JupiterLocator
 * 
 * 木星坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class JupiterLocator extends SolarStarLocator {

  /**
   * 构造函数
   * 
   * @param {Boolean} options 定位参数项
   */
  constructor(options = {}) {
    super();

    // 初始化参数
    this.private.id = 'jupiter';

    // 构造木星日心黄经坐标计算对象
    this.Calculator = new JupiterCalculator;

    // 构造光行时计算对象
    this.LightTimeEffect = new LightTimeEffect({
      originPositionProvider: new EarthCalculator,
      planetPositionProvider: new JupiterCalculator,
    });

    this.options(options);
  }
}

export default JupiterLocator;