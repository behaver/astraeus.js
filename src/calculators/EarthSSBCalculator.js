import JDateRepository from '../time/JDate/JDateRepository';
import CacheSpaceOnJDate from '../time/JDate/CacheSpaceOnJDate';
import RectangularCoordinate3D from '../math/Coordinate/3d/RectangularCoordinate3D';


/**
 * EarthSSBCalculator
 * 
 * 计算地球相对于太阳系质心的位置分量 X′、Y′、Z′
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class EarthSSBCalculator {

  /**
   * 构造函数
   * 
   * @param {JDateRepository} time 计算时间
   */
  constructor(time) {
    this.private = {};
    this.time = time;
  }

  /**
   * 计算位置分量值
   *
   * @private
   */
  calc() {

    var EPTable = [
      [ 999829, 1.753486, 6283.07585, 999892, 0.182659, 6283.07585, ], 
      [ 8353, 1.710345, 12566.1517, 24427, 3.141593, 0, ],
      [ 5611, 0, 0, 8353, 0.139529, 12566.1517, ],
      [ 105, 1.667226, 18849.22755, 105, 0.096417, 18849.22755, ],
      [ 31, 0.668752, 83996.8473181, 31, 5.381141, 83996.8473181, ],
      [ 26, 0.583102, 529.6909651, 26, 5.30104, 529.6909651, ],
      [ 21, 1.092352, 1577.3435424, 21, 2.662535, 1577.3435424, ],
      [ 17, 0.495402, 6279.5527316, 17, 5.207804, 6279.5527316, ],
      [ 17, 6.153155, 6286.5989683, 17, 4.582329, 6286.5989683, ],
      [ 14, 3.472728, 2352.8661538, 14, 1.900682, 2352.8661538, ],
      [ 11, 3.689848, 5223.6939198, 11, 5.273134, 5223.6939198, ],
      [ 9, 6.073899, 12036.4607349, 9, 4.503012, 12036.4607349, ],
      [ 9, 3.17572, 10213.2855462, 9, 1.605633, 10213.2855462, ],
      [ 6, 2.15262, 1059.3819302, 6, 0.581422, 1059.3819302, ],
      [ 7, 1.30699, 5753.3848849, 7, 2.807289, 398.1490034, ],
      [ 7, 4.355002, 398.1490034, 6, 6.029239, 5753.3848849, ],
      [ 7, 2.218215, 4705.7323075, 7, 0.647296, 4705.7323075, ],
      [ 6, 5.384792, 6812.7668151, 6, 3.813815, 6812.7668151, ],
      [ 5, 6.087683, 5884.9268466, 5, 4.527856, 5884.9268466, ],
      [ 5, 1.279337, 6256.7775302, 5, 5.991672, 6256.7775302, ],
      [ -4958.621183, 0.599451, 529.6909651, -4957.251908, 5.312032, 529.6909651, ], 
      [ -2715.862728, 0.874414, 213.2990954, -2719.711473, 5.586006, 213.2990954, ],
      [ -1546.717093, 5.312113, 38.1330356, -1546.802511, 3.740863, 38.1330356, ], 
      [ -836.293889, 5.481334, 74.7815986, -835.921839, 3.910457, 74.7815986, ],
    ];

    let x = 0,
        y = 0,
        z = 0,
        t = this.time.JDET,
        E = -0.40909280422232897,
        sinE = Math.sin(E),
        cosE = Math.cos(E);

    for (var i = 0; i < EPTable.length; i++) {
      let row = EPTable[i];
      x += row[0] * Math.cos(row[1] + row[2] * t);
      y += row[3] * Math.cos(row[4] + row[5] * t);
    }

    x += t * (1234 + 515 * Math.cos(6.002663 + 12566.1517 * t) + 13 * Math.cos(5.959431 + 18849.22755 * t) + 11 * Math.cos(2.015542 + 6283.07585 * t));;
    y += t * (930 + 515 * Math.cos(4.431805 + 12566.1517 * t) + 13 * Math.cos(4.388605 + 18849.22755 * t));
    z += t * (54 + 2278 * Math.cos(3.413725 + 6283.07585 * t) + 19 * Math.cos(3.370613 + 12566.15170 * t));
    
    x /= 1000000, y /= 1000000, z /= 1000000;

    this.cache.set('vector', {
      x,
      y: z * sinE + y * cosE,
      z: z * cosE - y * sinE,
    });
  }

  /**
   * 设置 time 值
   * 
   * @param {JDateRepository} time 计算时间
   */
  set time(time) {
    if (!(time instanceof JDateRepository)) throw Error('The param time should be a instance of JDateRepository');

    this.private.time = time;

    if (this.cache === undefined) this.cache = new CacheSpaceOnJDate(time);
    else this.cache.on(time);
  }

  /**
   * 获取 time 值
   * 
   * @return {JDateRepository} time 计算时间
   */
  get time() {
    return this.private.time;
  }

  /**
   * 获取 x 轴位置分量
   * 
   * @return {Number} x 轴位置分量
   */
  get x() {
    if (!this.cache.has('vector')) this.calc();

    return this.cache.get('vector').x;
  }

  /**
   * 获取 y 轴位置分量
   * 
   * @return {Number} y 轴位置分量
   */
  get y() {
    if (!this.cache.has('vector')) this.calc();

    return this.cache.get('vector').y;
  }

  /**
   * 获取 z 轴位置分量
   * 
   * @return {Number} z 轴位置分量
   */
  get z() {
    if (!this.cache.has('vector')) this.calc();

    return this.cache.get('vector').z;
  }

  /**
   * 获取地球相对太阳质心(SSB)位置向量
   * 
   * @return {RectangularCoordinate3D} 地球相对太阳质心(SSB)位置向量
   */
  get vector() {
    if (!this.cache.has('vector')) this.calc();

    let v = this.cache.get('vector');

    return new RectangularCoordinate3D(v.x, v.y, v.z);
  }
}

export default EarthSSBCalculator;