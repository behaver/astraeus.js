import Angle from '../math/angle';

const angle = new Angle;

/**
 * AtmosphericRefraction
 * 
 * 计算由大气折射导致的地平高度偏差的组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class AtmosphericRefraction {

  /**
   * 构造函数
   * 
   * @param {Number}  options.T         单位：摄氏度
   * @param {Number}  options.P         单位：毫巴/百帕
   * @param {Number}  options.apparentH 单位：度
   * @param {Number}  options.trueH     单位：度
   * @param {Boolean} options.isStrict  是否精确修正（考虑气压、温度影响）
   */
  constructor(options) {
    if (options == undefined) options = {};
    else if (options.constructor !== Object) throw Error('The param options should be a Object.');

    this.init(options);
  }

  /**
   * 初始化对象
   * 
   * @param  {Number}                options.T         单位：摄氏度
   * @param  {Number}                options.P         单位：毫巴/百帕
   * @param  {Number}                options.apparentH 单位：度
   * @param  {Number}                options.trueH     单位：度
   * @param  {Boolean}               options.isStrict  是否精确修正（考虑气压、温度影响）
   * 
   * @return {AtmosphericRefraction}                   返回 this 引用
   */
  init({
    T,
    P,
    apparentH,
    trueH,
    isStrict,
  }) {
    // 参数处理
    if (isStrict === undefined) isStrict = true;
    else isStrict = !!isStrict;

    if (T === undefined) T = 10;
    else if (typeof(T) !== 'number') throw Error('The param T should be a Number.');
    else if (T < -100 || T > 100) throw Error('The param T should be in (-100, 100).');

    if (P === undefined) P = 1010;
    else if (typeof(P) !== 'number') throw Error('The param P should be a Number.');
    else if (P < 500 || P > 1500) throw Error('The param P should be in (500, 1500).');

    this.private = {
      T,
      P,
      isStrict,
    }

    this.cache = {}

    if (apparentH !== undefined) this.apparentH = apparentH;
    if (trueH !== undefined) this.trueH = trueH;

    return this;
  }

  /**
   * 清空缓存
   *
   * @private
   * @return {AtmosphericRefraction} 返回 this 引用
   */
  clearCache() {
    if (this.private.origin === 'h0') {
      this.cache = { apparentH: this.cache.apparentH };
    } else if (this.private.origin === 'h') {
      this.cache = { trueH: this.cache.trueH };
    } else {
      this.cache = {};
    }

    return this;
  }

  /**
   * 设置 视地平高度
   * 
   * @param  {Number}                h0 视地平高度，定义域：[0, 90]，单位：度。
   * 
   * @return {AtmosphericRefraction}    返回 this 引用
   */
  set apparentH(h0) {
    if (typeof(h0) !== 'number') throw Error('The param h0 should be Number.');
    else if (h0 < 0 || h0 > 90) throw Error('The param h0 should be in [0, 90].');

    this.cache = { apparentH: h0 };
    this.private.origin = 'apparentH';
  }

  /**
   * 设置 真地平高度
   * 
   * @param  {Number}                h 真地平高度，定义域：[0, 90]，单位：度。
   * 
   * @return {AtmosphericRefraction}   返回 this 引用
   */
  set trueH(h) {
    if (typeof(h) !== 'number') throw Error('The param h should be Number.');
    else if (h < 0 || h > 90) throw Error('The param h should be in [0, 90].');

    this.cache = { trueH: h };
    this.private.origin = 'trueH';
  }

  /**
   * 设置 温度设定
   * 
   * @param {Number} t 温度设定，单位：摄氏度
   */
  set T(t) {
    if (t === undefined) t = 10;
    else if (typeof(t) !== 'number') throw Error('The param t should be a Number.');
    else if (t < -100 || t > 100) throw Error('The param t should be in (-100, 100).');

    this.private.T = t;

    if (this.private.isStrict) this.clearCache();
  }

  /**
   * 设置 大气压强设定
   * 
   * @param {Number} p 大气压强设定，单位：毫巴/百帕
   */
  set P(p) {
    if (typeof(p) !== 'number') throw Error('The param p should be a Number.');
    else if (p < 500 || p > 1500) throw Error('The param p should be in (500, 1500).');

    this.private.P = p;

    if (this.private.isStrict) this.clearCache();
  }

  /**
   * 设置 是否进行精确修正
   * 
   * @param  {Boolean} isStrict 是否进行精确修正
   */
  set isStrict(isStrict) {
    this.private.isStrict = !!isStrict;

    this.clearCache();
  }

  /**
   * 获取 视地平高度
   * 
   * @return {Number} 视地平高度，单位：度
   */
  get apparentH() {
    if (this.cache.apparentH === undefined) {
      let r = this.private.isStrict ? this.R : this.r;
      let h = this.cache.trueH;

      this.cache.apparentH = h + r;
    }

    return this.cache.apparentH;
  }

  /**
   * 获取 修整大气折射后的真地平高度
   * 
   * @return {Number} 真地平高度，单位：度
   */
  get trueH() {
    if (this.cache.trueH === undefined) {
      let r = this.private.isStrict ? this.R : this.r;
      let h0 = this.cache.apparentH;

      this.cache.trueH = h0 - r;
    }

    return this.cache.trueH;
  }

  /**
   * 获取 大气折射修正值
   *
   * 修正后，在 ho = 0 到 90° 范围内，最大误差 0.015′ = 0.9"
   * 
   * @return {Number} 大气折射修正值，单位：度。
   */
  get r() {
    if (this.cache.r === undefined) {
      let r;
      if (this.private.origin === 'apparentH' && this.cache.apparentH !== undefined) {
        let h0 = angle.setDegrees(this.cache.apparentH).getRadian();
        r = 0.0002909 / Math.tan(h0 + 0.00222676 / (h0 + 0.0767945)); // 结果单位：弧度
      } else if (this.private.origin === 'trueH' && this.cache.trueH !== undefined) {
        let h = angle.setDegrees(this.cache.trueH).getRadian();
        r = 0.0002967 / Math.tan(h + 0.003138 / (h + 0.08919)); // 结果单位：弧度
      } else throw Error('One of the trueH and apparentH should be given first.');

      r = angle.setRadian(r).getDegrees();
      
      // 二次修正
      r = r - 0.001 * Math.sin(0.2565634 * r + 0.2268928); // 结果单位：度

      this.cache.r = r;
    }

    return this.cache.r;
  }

  /**
   * 获取 大气折射修正值（包含温度和大气压强修正）
   *
   * 这只是大约修正，因为折射率还与光的波长有关。这些表达式适用于黄光，它对人眼的灵敏度最高。
   *
   * @return {Number} 大气折射修正值，单位：度。
   */
  get R() {
    if (this.cache.R === undefined) {
      let R = this.r * (this.private.P / 1010) * (283 / (273 + this.private.T));
      this.cache.R = R;
    }

    return this.cache.R;
  }

  /**
   * 获取 温度设定
   *
   * @return {Number} 温度设定，单位：摄氏度
   */
  get T() {
    return this.private.T;
  }

  /**
   * 获取 大气压强设定
   *
   * @return {Number} 大气压强设定，单位：百帕
   */
  get P() {
    return this.private.P;
  }

  /**
   * 获取 是否进行精确修正设定
   * 
   * @return {Boolean} 是否进行精确修正设定
   */
  get isStrict() {
    return this.private.isStrict;
  }
}

export default AtmosphericRefraction;