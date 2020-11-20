import EarthCalculator from '../../../calculators/SolarPlanetsCalculator/planets/Earth';
import SolarStarLocator from '../SolarStarLocator';
import LightTimeEffect from '../LightTimeEffect';
import SphericalCoordinate3D from '../../../math/Coordinate/3d/SphericalCoordinate3D';

/**
 * EarthLocator
 * 
 * 地球坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class EarthLocator extends SolarStarLocator {

  /**
   * 构造函数
   * 
   * @param {Boolean} options 定位参数项
   */
  constructor(options = {}) {
    super();

    // 初始化参数
    this.private.id = 'earth';

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
}

export default EarthLocator;