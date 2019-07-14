'use strict';

const JDateRepository = require('../time/JDate/JDateRepository');
const CacheSpaceOnJDate = require('../time/JDate/CacheSpaceOnJDate');
const RectangularCoordinate3D = require('../math/Coordinate/3d/RectangularCoordinate3D');

/**
 * EarthSSBVelocity
 * 
 * 计算在 J2000.0 赤道坐标中，地球相对于太阳系中心的速度分量 X′、Y′、Z′
 * 取得的速度值的单位是: 10^-8 AU/日
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class EarthSSBVelocity {

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
   * 计算速度值
   *
   * @private
   */
  calc() {
    // 角参数计算表
    let ATable = [
      [ 3.1761467, 1021.3285546 ], // 金 L2
      [ 1.7534703, 628.3075849 ], // 地 L3
      [ 6.2034809, 334.0612431 ], // 火 L4
      [ 0.5995465, 52.9690965 ], // 木 L5
      [ 0.8740168, 21.3299095 ], // 土 L6
      [ 5.4812939, 7.4781599 ], // 天 L7
      [ 5.3118863, 3.8133036 ], // 海 L8
      [ 3.8103444, 8399.6847337 ], // 月 L'
      [ 5.1984667, 7771.3771486 ], // 月 D
      [ 2.3555559, 8328.6914289 ], // 月 M'
      [ 1.6279052, 8433.4661601 ], // 月 F
    ];

    // 角参数计算表
    let APTable = [
      [ 1, 1, 0, 0, 0, 0, ],
      [ 2, 1, 0, 0, 0, 0, ],
      [ 1, 3, 0, 0, 0, 0, ],
      [ 1, 7, 0, 0, 0, 0, ],
      [ 3, 1, 0, 0, 0, 0, ],
      [ 1, 4, 0, 0, 0, 0, ],
      [ 1, 10, 0, 0, 0, 0, ],
      [ 1, 7, 1, 9, 0, 0, ],
      [ 2, 3, 0, 0, 0, 0, ],
      [ 2, 1, -1, 3, 0, 0, ],
      [ 3, 1, -8, 2, 3, 3, ],
      [ 5, 1, -8, 2, 3, 3, ],
      [ 2, 0, -1, 1, 0, 0, ],
      [ 1, 0, 0, 0, 0, 0, ],
      [ 1, 5, 0, 0, 0, 0, ],
      [ 1, 1, -2, 3, 0, 0, ],
      [ 1, 6, 0, 0, 0, 0, ],
      [ 1, 1, 1, 3, 0, 0, ],
      [ 2, 0, -2, 1, 0, 0, ],
      [ 1, 1, -1, 3, 0, 0, ],
      [ 4, 1, 0, 0, 0, 0, ],
      [ 3, 1, -2, 3, 0, 0, ],
      [ 1, 0, -2, 1, 0, 0, ],
      [ 2, 0, -3, 1, 0, 0, ],
      [ 2, 4, 0, 0, 0, 0, ],
      [ 2, 0, -4, 1, 0, 0, ],
      [ 3, 1, -2, 2, 0, 0, ],
      [ 1, 7, 2, 8, -1, 9, ],
      [ 8, 0, -12, 1, 0, 0, ],
      [ 8, 0, -14, 1, 0, 0, ],
      [ 2, 2, 0, 0, 0, 0, ],
      [ 3, 0, -4, 1, 0, 0, ],
      [ 2, 1, -2, 3, 0, 0, ],
      [ 3, 0, -3, 1, 0, 0, ],
      [ 2, 1, -2, 2, 0, 0, ],
      [ 1, 7, -2, 8, 0, 0, ],
    ];

    // 地球相对于太阳系质心的速度计算表
    let EVTable = [
      [ -1719914, -25, 25, 1578089, 10, 684185 ], 
      [ 6434, 28007, 25697, -5904, 11141, -2559 ],
      [ 715, 0, 6, -657, -15, -282 ],
      [ 715, 0, 0, -656, 0, -285 ],
      [ 486, -236, -216, -446, -94, -193 ],
      [ 159, 0, 2, -147, -6, -61 ], 
      [ 0, 0, 0, 26, 0, -59 ],
      [ 39, 0, 0, -36, 0, -16 ], 
      [ 33, -10, -9, -30, -5, -13 ],
      [ 31, 1, 1, -28, 0, -12 ],
      [ 8, -28, 25, 8, 11, 3 ], //11
      [ 8, -28, -25, -8, -11, -3 ],
      [ 21, 0, 0, -19, 0, -8 ],
      [ -19, 0, 0, 17, 0, 8 ],
      [ 17, 0, 0, -16, 0, -7 ],
      [ 16, 0, 0, 15, 1, 7 ], //16
      [ 16, 0, 1, -15, -3, -6 ],
      [ 11, -1, -1, -10, -1, -5 ],
      [ 0, -11, -10, 0, -4, 0 ],
      [ -11, -2, -2, 9, -1, 4 ],
      [ -7, -8, -8, 6, -3, 3 ], //21
      [ -10, 0, 0, 9, 0, 4 ],
      [ -9, 0, 0, -9, 0, -4 ],
      [ -9, 0, 0, -8, 0, -4 ],
      [ 0, -9, -8, 0, -3, 0 ],
      [ 0, -9, 8, 0, 3, 0 ], //26
      [ 8, 0, 0, -8, 0, -3 ],
      [ 8, 0, 0, -7, 0, -3 ],
      [ -4, -7, -6, 4, -3, 2 ],
      [ -4, -7, 6, -4, 3, -2 ],
      [ -6, -5, -4, 5, -2, 2 ], //31
      [ -1, -1, -2, -7, 1, -4 ],
      [ 4, -6, -5, -4, -2, -2 ],
      [ 0, -7, -6, 0, -3, 0 ],
      [ 5, -5, -4, -5, -2, -2 ],
      [ 5, 0, 0, -5, 0, -2 ], //36
    ];

    // 地球相对于太阳系质心的速度泊松项计算表
    let EVPTable = [
      [ 0, -2, 0, -13, 156, 32, -358 ], 
      [ 1, 141, -107, -95, -130, -48, -55 ],
      [ 4, -5, -4, -4, 5, 0, 0 ],
    ];
    let T = this.time.JDEC;

    let ARTable = [];

    for (var i = 0; i < ATable.length; i++) {
      // 计算角度，单位：弧度
      ARTable[i] = ATable[i][0] + ATable[i][1] * T;
    }


    let APRTable = [];

    for (var i = 0; i < APTable.length; i++) {
      // 角参数计算
      let AP = APTable[i][0] * ARTable[APTable[i][1]] 
             + APTable[i][2] * ARTable[APTable[i][3]] 
             + APTable[i][4] * ARTable[APTable[i][5]];

      APRTable[i] = [ Math.sin(AP), Math.cos(AP) ];
    }

    let x = 0,
        y = 0,
        z = 0;

    for (var i = 0; i < APRTable.length; i++) {
      let sinAP = APRTable[i][0],
          cosAP = APRTable[i][1];

      // 地球 SSB 速度分量计算
      x += EVTable[i][0] * sinAP + EVTable[i][1] * cosAP;
      y += EVTable[i][2] * sinAP + EVTable[i][3] * cosAP;
      z += EVTable[i][4] * sinAP + EVTable[i][5] * cosAP;
    }

    for (var i = 0; i < EVPTable.length; i++) {
      // 地球 SSB 速度分量泊松项计算
      let sinAP = APRTable[EVPTable[i][0]][0],
          cosAP = APRTable[EVPTable[i][0]][1];

      x += EVPTable[i][1] * T * sinAP + EVPTable[i][2] * T * cosAP;
      y += EVPTable[i][3] * T * sinAP + EVPTable[i][4] * T * cosAP;
      z += EVPTable[i][5] * T * sinAP + EVPTable[i][6] * T * cosAP;
    }

    this.cache.set('vector', { x, y, z });
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
   * 获取 x 轴速度分量
   *
   * 单位：10^-8 AU/日
   * 
   * @return {Number} x 轴速度分量
   */
  get x() {
    if (!this.cache.has('vector')) this.calc();

    return this.cache.get('vector').x;
  }

  /**
   * 获取 y 轴速度分量
   *
   * 单位：10^-8 AU/日
   * 
   * @return {Number} y 轴速度分量
   */
  get y() {
    if (!this.cache.has('vector')) this.calc();

    return this.cache.get('vector').y;
  }

  /**
   * 获取 z 轴速度分量
   *
   * 单位：10^-8 AU/日
   * 
   * @return {Number} z 轴速度分量
   */
  get z() {
    if (!this.cache.has('vector')) this.calc();

    return this.cache.get('vector').z;
  }

  /**
   * 获取地球相对太阳质心(SSB)速度向量
   *
   * 单位：10^-8 AU/日
   * 
   * @return {RectangularCoordinate3D} 地球相对太阳质心(SSB)速度向量
   */
  get vector() {
    if (!this.cache.has('vector')) this.calc();

    let v = this.cache.get('vector');

    return new RectangularCoordinate3D(v.x, v.y, v.z);
  }
}

module.exports = EarthSSBVelocity;
