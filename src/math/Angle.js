
/**
 * Angle
 * 
 * Angle 对象用于处理各种角度数值
 *
 * @author 董 三碗 <qianxing@yeah.net>
 */
class Angle {

  /**
   * 构造函数
   * 
   * @param  {Number} num  需设置的角度数值，缺省为 0
   * @param  {String} unit 数值单位，缺省为'd'，有下列可选值：
   *   'd'    角度
   *   'm'    角分
   *   's'    角秒
   *   'ms'   角毫秒
   *   'r'    弧度
   *   'th'   时角时
   *   'tm'   时角分
   *   'ts'   时角秒
   *   'tms'  时角毫秒
   *   'hac'  复合时角对象
   *   'dac'  复合度角对象
   *   'hacs' 复合时角字符串
   *   'dacs' 复合度角字符串
   */
  constructor(num, unit = 'd') {
    // 各类角度单位数值的缓存对象，以减少重复运算
    this.cache = {};

    // 角度对应转换的毫秒值，是模块的必要 基础值
    this.milliseconds = 0;

    // 各种角度单位与毫秒之间的 转换比例 映射
    this.scalesMap = {
      ms: 1,
      s: 1000,
      m: 60000,
      d: 3600000,
      r: 648000000 / Math.PI,
      th: 54000000,
      tm: 900000,
      ts: 15000,
      tms: 15,
    };

    if (typeof num === 'number') this.setValue(unit, num);
    else if (typeof num === 'object') {
      if (unit == 'dac') this.setDAComplex(num);
      if (unit == 'hac') this.setHAComplex(num);
    } else if (typeof num === 'string') {
      if (unit == 'dacs') this.parseDACString(num);
      if (unit == 'hacs') this.parseHACString(num);
    }
  }

  /**
   * 获取角度值
   * 
   * @param  {String} unit 数值单位
   * @return {Number}      返回角度数值
   */
  getValue(unit) {
    if (typeof(unit) !== 'string') throw Error('The param unit should be a String.');
    if (unit in this.scalesMap) {
      if (this.cache[unit] === undefined) return this.cache[unit] = this.milliseconds / this.scalesMap[unit];
      else return this.cache[unit];
    } else throw Error('Unknow angle unit.');
  }

  /**
   * 设置角度值
   * 
   * @param  {String} unit 数值单位
   * @param  {Number} num  需设置的角度数值
   * @return {Angle}       返回 this 引用
   */
  setValue(unit, num) {
    if (typeof(unit) !== 'string') throw Error('The param unit should be a String.');
    if (typeof(num) !== 'number') throw Error('The param num should be a Number.');
    if (unit in this.scalesMap) {
      this.cache = {};
      this.cache[unit] = num;
      this.milliseconds = num * this.scalesMap[unit];
    } else throw Error('Illagelity param unit.');
    return this;
  }

  /**
   * 以 角毫秒 为单位，获取角度数值
   * 
   * @return {Number}     返回 角毫秒 数值
   */
  getMilliseconds() {
    return this.milliseconds;
  }

  /**
   * 以 角毫秒 为单位，设置角度数值
   * 
   * @param  {Number} num 需设置的 角毫秒 数值
   * @return {Angle}      返回 this 引用
   */
  setMilliseconds(num) {
    if (typeof(num) !== 'number') throw Error('The param num should be a Number.');
    this.cache = {};
    this.milliseconds = num;
    return this;
  }

  /**
   * 以 角秒 为单位，获取角度数值
   *
   * @return {Number}     返回 角秒 数值
   */
  getSeconds() {
    return this.getValue('s');
  }

  /**
   * 以 角秒 为单位，设置角度数值
   *
   * @param  {Number} num 需设置的 角秒 数值
   * @return {Angle}      返回 this 引用
   */
  setSeconds(num) {
    return this.setValue('s', num);
  }

  /**
   * 以 角分 为单位，获取角度数值
   *
   * @return {Number}     返回 角分 数值
   */
  getMinutes() {
    return this.getValue('m');
  }

  /**
   * 以 角分 为单位，设置角度数值
   * 
   * @param  {Number} num 需设置的 角分 数值
   * @return {Angle}      返回 this 引用
   */
  setMinutes(num) {
    return this.setValue('m', num);
  }

  /**
   * 以 角度 为单位，获取角度数值
   * 
   * @return {Number}     返回 角度 数值
   */
  getDegrees() {
    return this.getValue('d');
  }

  /**
   * 以 角度 为单位，设置角度数值
   *
   * @param  {Number} num 需设置的 角度 数值
   * @return {Angle}      返回 this 引用
   */
  setDegrees(num) {
    return this.setValue('d', num);
  }

  /**
   * 以 弧度 为单位，获取角度数值
   * 
   * @return {Number}     返回 弧度 引用
   */
  getRadian() {
    return this.getValue('r');
  }

  /**
   * 以 弧度 为单位，设置角度数值
   *
   * @param  {Number} num 需设置的 弧度 数值
   * @return {Angle}      返回 this 引用
   */
  setRadian(num) {
    return this.setValue('r', num);
  }

  /**
   * 以 时角时 为单位，获取角度数值
   *
   * @return {Number}     返回 时角时 数值
   */
  getTHours() {
    return this.getValue('th');
  }

  /**
   * 以 时角时 为单位，设置角度数值
   *
   * @param  {Number} num 需设置的 时角时 数值
   * @return {Angle}      返回 this 引用
   */
  setTHours(num) {
    return this.setValue('th', num);
  }

  /**
   * 以 时角分 为单位，获取角度数值
   *
   * @return {Number}     返回 时角分 数值
   */
  getTMinutes() {
    return this.getValue('tm');
  }

  /**
   * 以 时角分 为单位，设置角度数值
   *
   * @param  {Number} num 需设置的 时角分 数值
   * @return {Angle}      返回 this 引用
   */
  setTMinutes(num) {
    return this.setValue('tm', num);
  }

  /**
   * 以 时角秒 为单位，获取角度数值
   *
   * @return {Number}     返回 时角秒 数值
   */
  getTSeconds() {
    return this.getValue('ts');
  }

  /**
   * 以 时角秒 为单位，设置角度数值
   * 
   * @param  {Number} num 需设置的 时角秒 数值
   * @return {Angle}      返回 this 引用
   */
  setTSeconds(num) {
    return this.setValue('ts', num);
  }

  /**
   * 以 时角毫秒 为单位，获取角度数值
   *
   * @return {Number}     返回 时角毫秒 数值
   */
  getTMilliseconds() {
    return this.getValue('tms');
  }

  /**
   * 以 时角毫秒 为单位，获取角度数值
   *
   * @param  {Number} num 需设置的 时角毫秒 数值
   * @return {Angle}      返回 this 引用
   */
  setTMilliseconds(num) {
    return this.setValue('tms', num);
  }

  /**
   * 以 复合时角 获取角度数值
   *
   * @return {Object}     返回 复合时角 数值对象
   */
  getHAComplex() {
    if (this.cache.hac === undefined) { // 生成 复合时角 对象
      this.cache.hac = {};
      let _m = this.milliseconds;
      this.cache.hac.h = Math.floor(_m / this.scalesMap['th']);
      _m -= this.cache.hac.h * this.scalesMap['th'];
      this.cache.hac.m = Math.floor(_m / this.scalesMap['tm']);
      _m -= this.cache.hac.m * this.scalesMap['tm'];
      this.cache.hac.s = Math.floor(_m / this.scalesMap['ts']);
      _m -= this.cache.hac.s * this.scalesMap['ts'];
      this.cache.hac.ms = _m / this.scalesMap['tms'];
      return this.cache.hac;
    } else return this.cache.hac;
  }

  /**
   * 以 复合时角 设置角度数值
   *
   * @param  {Mixed}  h   可以是 复合时角 对象，则后续 m、s、ms 参数无效，或者是复合时角中 时角时部分 数值，配合后续参数设定角度数值
   * @param  {Number} m   需设置的复合时角中 时角分部分 的数值
   * @param  {Number} s   需设置的复合时角中 时角秒部分 的数值
   * @param  {Number} ms  需设置的复合时角中 时角毫秒部分 的数值
   * @return {Angle}      返回 this 引用
   */
  setHAComplex(h, m, s, ms) {
    if (typeof(h) === 'object') {
      var _h = h.h == undefined ? 0 : Math.floor(h.h);
      var _m = h.m == undefined ? 0 : Math.floor(h.m);
      var _s = h.s == undefined ? 0 : Math.floor(h.s);

      // 考虑 s 为小数及 ms 是否设定的情况
      let _sms = h.s % 1 * 1000;
      if (_sms && h.ms == undefined) var _ms = _sms;
      else var _ms = h.ms == undefined ? 0 : parseFloat(h.ms);
    } else if (typeof(h) === 'number' || typeof(h) === 'string') {
      var _h = h == undefined ? 0 : Math.floor(h);
      var _m = m == undefined ? 0 : Math.floor(m);
      var _s = s == undefined ? 0 : Math.floor(s);

      // 考虑 s 为小数及 ms 是否设定的情况
      let _sms = s % 1 * 1000;
      if (_sms && ms == undefined) var _ms = _sms;
      else var _ms = ms == undefined ? 0 : parseFloat(ms);
    } else throw Error('Illagelity parameters.');

    if (_m >= 60 || _m <= -60) throw Error('The range of tMinutes must be (-60, 60).');
    if (_s >= 60 || _s <= -60) throw Error('The range of tSeconds must be (-60, 60).');
    if (_ms >= 1000 || _ms <= -1000) throw Error('The range of tMilliseconds must be (-1000, 1000).');
    
    if (_h >= 0 && _m >= 0 && _s >= 0 && _ms >= 0 || _h <= 0 && _m <= 0 && _s <= 0 && _ms <= 0) { // 组成数值的正负需一致
      this.cache = {
        hac: { h: _h, m: _m, s: _s, ms: _ms, },
      };

      this.milliseconds = this.cache.hac.h * this.scalesMap['th'] + this.cache.hac.m * this.scalesMap['tm'] + this.cache.hac.s * this.scalesMap['ts'] + this.cache.hac.ms * this.scalesMap['tms'];
    } else throw Error('The signs must be consistent');

    return this;
  }

  /**
   * 以 复合度角 获取角度数值
   *
   * @return {Object}      返回 复合度角 数值对象
   */
  getDAComplex() {
    if (this.cache.dac === undefined) { // 生成 复合时角 对象
      this.cache.dac = {};
      let _m = this.milliseconds;
      this.cache.dac.d = Math.floor(_m / this.scalesMap['d']);
      _m -= this.cache.dac.d * this.scalesMap['d'];
      this.cache.dac.m = Math.floor(_m / this.scalesMap['m']);
      _m -= this.cache.dac.m * this.scalesMap['m'];
      this.cache.dac.s = Math.floor(_m / this.scalesMap['s']);
      _m -= this.cache.dac.s * this.scalesMap['s'];
      this.cache.dac.ms = _m;
      return this.cache.dac;
    } else {
      return this.cache.dac;
    }
  }

  /**
   * 以 复合度角 设置角度数值
   *
   * @param  {Mixed}  d    可以是 复合度角 对象，则后续 m、s、ms 参数无效，或者是复合度角中 度角度部分 数值，配合后续参数设定角度数值
   * @param  {Number} m    需设置的复合度角中 度角分部分 的数值
   * @param  {Number} s    需设置的复合度角中 度角秒部分 的数值
   * @param  {Number} ms   需设置的复合度角中 度角毫秒部分 的数值
   * @return {Angle}       返回 this 引用
   */
  setDAComplex(d, m, s, ms) {
    if (typeof(d) === 'object') {
      var _d = d.d == undefined ? 0 : Math.floor(d.d);
      var _m = d.m == undefined ? 0 : Math.floor(d.m);
      var _s = d.s == undefined ? 0 : Math.floor(d.s);

      // 考虑 s 为小数及 ms 是否设定的情况
      let _sms = d.s % 1 * 1000;
      if (_sms && d.ms == undefined) var _ms = _sms;
      else var _ms = d.ms == undefined ? 0 : parseFloat(d.ms);
    } else if (typeof(d) === 'number' || typeof(d) === 'string') {
      var _d = d == undefined ? 0 : Math.floor(d);
      var _m = m == undefined ? 0 : Math.floor(m);
      var _s = s == undefined ? 0 : Math.floor(s);

      // 考虑 s 为小数及 ms 是否设定的情况
      let _sms = s % 1 * 1000;
      if (_sms && ms == undefined) var _ms = _sms;
      else var _ms = ms == undefined ? 0 : parseFloat(ms);
    } else throw Error('Illagelity parameters.');

    if (_m >= 60 || _m <= -60) throw Error('The range of tMinutes must be (-60, 60).');
    if (_s >= 60 || _s <= -60) throw Error('The range of tSeconds must be (-60, 60).');
    if (_ms >= 1000 || _ms <= -1000) throw Error('The range of tMilliseconds must be (-1000, 1000).');

    if (_d >= 0 && _m >= 0 && _s >= 0 && _ms >= 0 || _d <= 0 && _m <= 0 && _s <= 0 && _ms <= 0) { // 组成数值的正负需一致
      this.cache = {
        dac: { d: _d, m: _m, s: _s, ms: _ms, },
      };

      this.milliseconds = this.cache.dac.d * this.scalesMap['d'] + this.cache.dac.m * this.scalesMap['m'] + this.cache.dac.s * this.scalesMap['s'] + this.cache.dac.ms * this.scalesMap['ms'];
    } else throw Error('The signs must be consistent');

    return this;
  }

  /**
   * 解析复合度角字符串，并以结果设置角度数值
   *
   * @param {String} str 需设置的 复合度角 字符串
   * @return {Angle}     返回 this 引用
   */
  parseDACString(str) {
    if (typeof(str) !== 'string') throw Error('The param str should be a String.');
    let r = str.match(/^([-+]?\d+)[°|d]\s*(?:(\d+)[′|m]\s*(?:(\d+)(?:\.(\d+))?[″|s]\s*(?:(\d+)ms\s*)?)?)?/);
    if (r) {
      // 两种 ms 字符串给定方式的判别处理
      if (r[5] !== undefined) var _ms = parseFloat(r[5]);
      else var _ms  = r[4] ? parseFloat('0.' + r[4]) * 1000 : 0;

      let dac = {
        d: r[1] ? parseInt(r[1], 10) : 0,
        m: r[2] ? parseInt(r[2], 10) : 0,
        s: r[3] ? parseInt(r[3], 10) : 0,
        ms: _ms,
      };

      if (dac.d < 0) { // 负值角度的组成数值一致为负
        dac.m = -dac.m;
        dac.s = -dac.s;
        dac.ms = -dac.ms;
      };

      this.setDAComplex(dac);
    } else throw Error('Illagelity parameters.');

    return this;
  }

  /**
   * 生成复合度角字符串
   *
   * @return {String}     返回 复合度角 字符串
   */
  makeDACString() {
    let dac = this.getDAComplex();
    if (dac.d < 0 || dac.m < 0 || dac.s < 0 || dac.ms < 0) { // 负角度值字符串生成
      return `-${Math.abs(dac.d)}°${Math.abs(dac.m)}′${Math.abs(dac.s + dac.ms / 1000).toFixed(3)}″`;
    } else return `${dac.d}°${dac.m}′${(dac.s + dac.ms / 1000).toFixed(3)}″`;
  }

  /**
   * 解析复合时角字符串，并以结果设置角度数值
   *
   * @param {String} str  需设置的 复合时角 字符串
   * @return {Angle}      返回 this 引用
   */
  parseHACString(str) {
    if (typeof(str) !== 'string') throw Error('The param str should be a String.');
    let r = str.match(/^([-+]?\d+)h\s*(?:(\d+)m\s*(?:(\d+)(?:\.(\d+))?s\s*(?:(\d+)ms\s*)?)?)?/);
    if (r) {
      // 两种 ms 字符串给定方式的判别处理
      if (r[5] !== undefined) var _ms = parseFloat(r[5]);
      else var _ms  = r[4] ? parseFloat('0.' + r[4]) * 1000 : 0;

      let hac = { 
        h: r[1] ? parseInt(r[1], 10) : 0,
        m: r[2] ? parseInt(r[2], 10) : 0,
        s: r[3] ? parseInt(r[3], 10) : 0,
        ms: _ms,
      };

      if (hac.h < 0) { // 负值角度的组成数值一致为负
        hac.m = -hac.m;
        hac.s = -hac.s;
        hac.ms = -hac.ms;
      };

      this.setHAComplex(hac);
    } else throw Error('Illagelity parameters.');

    return this;
  }

  /**
   * 生成复合时角字符串
   *
   * @return {String}     返回 复合时角 字符串
   */
  makeHACString() {
    let hac = this.getHAComplex();
    if (hac.h < 0 || hac.m < 0 || hac.s < 0 || hac.ms < 0) { // 负角度值字符串生成
      return `-${Math.abs(hac.h)}h ${Math.abs(hac.m)}m ${Math.abs(hac.s)}s ${Math.abs(hac.ms).toFixed(2)}ms`;
    } else return `${hac.h}h ${hac.m}m ${hac.s}s ${hac.ms.toFixed(2)}ms`;
  }

  /**
   * 转换角度至 [from, from+360°) 的数值范围
   * 
   * @param  {Number} from 限定圆周范围的起始角度数值，缺省为 0
   * @param  {String} unit 设定起始角度数值的 单位，缺省为 'd'，有下列可选值：
   *   'd'   角度
   *   'm'   角分
   *   's'   角秒
   *   'ms'  角毫秒
   *   'r'   弧度
   *   'th'  时角时
   *   'tm'  时角分
   *   'ts'  时角秒
   *   'tms' 时角毫秒
   * @return {Angle}       返回 this 引用
   */
  inRound(from = 0, unit = 'd') {
    if (typeof(unit) !== 'string') throw Error('The param unit should be a String.');
    if (typeof(from) !== 'number') throw Error('The param from should be a Number.');
    if (unit in this.scalesMap) {
      let from_ms = from * this.scalesMap[unit];
      let T_ms = 1296000000;
      this.milliseconds += Math.ceil((from_ms - this.milliseconds) / T_ms) * T_ms;
      this.cache = {};
    } else throw Error('unknow unit.');
    return this;
  }

  /**
   * 转换为字符串
   * 
   * @return {String}      返回 复合度角 字符串
   */
  toString() {
    return this.makeDACString();
  }
};

export default Angle;