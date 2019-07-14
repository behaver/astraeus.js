# FixedStarLocator

## 简介

FixedStarLocator 是一个用于计算恒星赤道坐标的天文组件，计算的结果最终将以 `EquinoctialCoordinate` 实例返回。

## 用例

```js
const Astraeus = require('@behaver/astraeus.js');

// 实例化儒略时间对象
let jdate = new Astraeus.JDate(2462088.69, 'jde');

// 实例化恒星赤道坐标计算组件
let FSC = new Astraeus.FixedStarLocator;

// 获取赤道坐标组件
let res = FSC.get({
  time: jdate,
  ra: 41.0500,
  dec: 49.2283,
  pmra: 0.336,
  pmdec: -0.089,
  radvel: 25,
  parallax: 0.089,
});

let eqc = res.coord;

// 输出赤经，单位：°
console.log(eqc.longitude.getDegrees());

// 输出赤纬，单位：°
console.log(eqc.latitude.getDegrees());

// 输出赤地心距，单位：AU
console.log(eqc.radius);
```

## API

`constructor(options)`

构造函数

`options(options)`

设置定位参数项：

* options.id       位置id
* options.ra       J2000 平赤经，单位：°
* options.dec      J2000 平赤纬，单位：°
* options.parallax 周年视差，单位：角秒
* options.pmra     赤经自行，单位：角秒每儒略年
* options.pmdec    赤纬自行，单位：角秒每儒略年
* options.radvel   日心视向速度，单位：km/s
* options.time     儒略时间对象
* options.model    计算模型字串

`get(options)`

获取恒星赤道坐标对象

`set id(value)`

设定 位置id

`get id()`

获取 位置id

`set time(value)`

设置 儒略时间对象

`get time()`

获取 儒略时间对象

`set model(value)`

设置 计算模型

`get model()`

获取 计算模型

`set ra(value)`

设定 恒星 J2000 平赤经（单位：°）

`get ra()`

获取 恒星 J2000 平赤经（单位：°）

`set dec(value)`

设定 恒星 J2000 平赤纬（单位：°）

`get dec()`

获取 恒星 J2000 平赤纬（单位：°）

`set parallax(value)`

设定 周年视差（单位：角秒）

`get parallax()`

获取 周年视差（单位：角秒）

`set pmra(value)`

设定 赤经自行（单位：角秒每儒略年）

`get pmra()`

获取 赤经自行（单位：角秒每儒略年）

`set pmdec(value)`

设定 赤纬自行（单位：角秒每儒略年）

`get pmdec()`

获取 赤纬自行（单位：角秒每儒略年）

`set radvel(value)`

设定 日心视向速度（单位：km/s）

`get radvel()`

获取 日心视向速度（单位：km/s）

[返回主页](../../readme.md)
