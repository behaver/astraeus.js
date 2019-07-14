# EarthSSBCalculator

## 简介

本组件用于计算地球相对于太阳系质心的位置分量 X′、Y′、Z′。

## 用例

```js
const Astraeus = require('@behaver/astraeus.js');

let jdr = new Astraeus.JDate(2334345, 'jde'),
    v = new Astraeus.EarthSSBCalculator(jdr);

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

获取 x 轴位置分量

`get y()`

获取 y 轴位置分量

`get z()`

获取 z 轴位置分量

`get vector()`

获取地球相对太阳质心(SSB)位置向量

[返回主页](../../readme.md)
