# SolarStarLocator

## 简介

SolarStarLocator 是一个关于基础星体天文坐标的计算组件。其中包含了对太阳、月球、太阳系八大行星和冥王星的天文坐标计算，同时提供了计算精度的控制接口。

## 用例

```js
const Astraeus = require('@behaver/astraeus.js');

// 实例化儒略时间
let jdate = new Astraeus.JDate(2448908.5, 'jde');

// 实例化木星坐标对象
let JL = new Astraeus.JupiterLocator({
  time: jdate,
  withLTE: true,
});

// 获取定位计算结果集
let res = JL.get();

// 获取黄道坐标对象
let coord = res.coord;

// 获取黄经，单位：度
let JupL = coord.longitude.getDegrees();

// 设置坐标计算精度为低
JL.Calculator.accuracy = 'low';

// 获取低精度定位计算结果集
let res_l = JupCoord.get();

// 获取低精度木星黄纬，单位：弧度
let JupBLow = res_l.latitude.getRadian();
```

## API

### 属性

`time` 儒略时间设定

`withLTE` 是否考虑光行时影响设定

### 方法

`constructor(options)`

构造函数

`options(options)`

设置定位参数项

* options.time 参考时间
* options.withLTE 考虑光行时修正

`get(options)`

获取计算结果

[返回主页](../../readme.md)
