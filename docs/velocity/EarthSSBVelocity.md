# EarthSSBVelocity

## 简介

本组件用于计算在 J2000.0 赤道坐标中，地球相对于太阳系中心的速度分量 X′、Y′、Z′。

取得的速度值的单位是: 10^-8 AU/日

## 用例

```js
const Astraeus = require('@behaver/astraeus.js');

let jdr = new Astraeus.JDate(2334345, 'jde'),
    v = new Astraeus.EarthSSBVelocity(jdr);

console.log(v.x, v.y, v.z);
```

## API

`constructor(time)`

构造函数:

* time 计算时间 JDateRepository

`set time(time)`

设置 time 值:

* time 计算时间 JDateRepository

`get time()`

获取 time 值

`get x()`

获取 x 轴速度分量 (单位：10^-8 AU/日)

`get y()`

获取 y 轴速度分量 (单位：10^-8 AU/日)

`get z()`

获取 z 轴速度分量 (单位：10^-8 AU/日)

`get vector()`

获取地球相对太阳质心(SSB)速度向量 (单位：10^-8 AU/日)

[返回主页](../../readme.md)
