# FixedStarCalculator

## 简介

FixedStarCalculator 是一个用以计算恒星赤道坐标的天文学组件。它包含有动力学计算子组件 `DynamicCalculator` 和三角学计算子组件 `TrigonometricCalculator`。

## 用例

```js
const Astraeus = require('@behaver/astraeus.js');

// 实例化儒略时间对象
let jdate = new Astraeus.JDate(2462088.69, 'jde');

// 实例化恒星坐标计算组件
let Calculator = new Astraeus.FSDynamicCalculator(jdate);
// let Calculator = new Astraeus.FSTrigonometricCalculator(jdate);

// 计算恒星修正自行和周年视差后的球坐标
let sc = Calculator.calc({
  ra: 41.0500,
  dec: 49.2283,
  pmra: 0.336,
  pmdec: -0.089,
  radvel: 25,
  parallax: 0.089,
});

// 实例化赤道坐标组件
let eqc = new Astraeus.EquinoctialCoordinate({
  sc,
});

// 修正岁差
eqc.epoch = Calculator.epoch;

// 修正光行差
eqc.withAnnualAberration = true;

// 修正章动
eqc.withNutation = true;

// 输出赤经度数
console.log(eqc.ra.getDegrees());

// 输出赤纬度数
console.log(eqc.dec.getDegrees());

// 输出赤地心距
console.log(eqc.radius);
```

## API

`constructor(epoch)`

构造函数

* epoch 目标历元 JDateRepository 对象

`set epoch(value)`

设置目标历元对象

* epoch 目标历元 JDateRepository 对象

`get epoch()`

获取目标历元对象

`calc(options)`

计算恒星赤道坐标（修正了自行和周年视差）

* options.ra       J2000 平赤经
* options.dec      J2000 平赤纬
* options.pmra     赤经周年自行，单位：角秒每儒略年
* options.pmdec    赤纬周年自行，单位：角秒每儒略年
* options.radvel   日心视向速度，单位：km/s
* options.parallax 周年视差，单位：角秒

[返回主页](../../readme.md)
