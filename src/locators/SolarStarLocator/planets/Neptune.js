import EarthCalculator from '../../../calculators/SolarPlanetsCalculator/planets/Earth';
import NeptuneCalculator from '../../../calculators/SolarPlanetsCalculator/planets/Neptune';
import SolarStarLocator from '../SolarStarLocator';
import LightTimeEffect from '../LightTimeEffect';

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

export default NeptuneLocator;