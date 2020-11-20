import EarthCalculator from '../../../calculators/SolarPlanetsCalculator/planets/Earth';
import UranusCalculator from '../../../calculators/SolarPlanetsCalculator/planets/Uranus';
import SolarStarLocator from '../SolarStarLocator';
import LightTimeEffect from '../LightTimeEffect';

/**
 * UranusLocator
 * 
 * 天王星坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class UranusLocator extends SolarStarLocator {

  /**
   * 构造函数
   * 
   * @param {Boolean} options 定位参数项
   */
  constructor(options = {}) {
    super();

    // 初始化参数
    this.private.id = 'uranus';

    // 构造天王星日心黄经坐标计算对象
    this.Calculator = new UranusCalculator;

    // 构造光行时计算对象
    this.LightTimeEffect = new LightTimeEffect({
      originPositionProvider: new EarthCalculator,
      planetPositionProvider: new UranusCalculator,
    });

    this.options(options);
  }
}

export default UranusLocator;