# AnnualParallax

## 简介

AnnualParallax 是一个用于计算天体周年光行差的组件。

本组件计算支持的坐标系统有：赤道坐标和黄道坐标，计算结果的历元标准为 J2000 历元，单位为：弧度。

## 用例

```js
const Astraeus = require('@behaver/astraeus.js');

let AP = new Astraeus.AnnualParallax({
  time: new Astraeus.JDate(18, 'j2000'),
  sc: new Astraeus.SphericalCoordinate3D(230043, 1.123, 1.55),
  system: 'ecliptic',
});

let res = AP.get();
```

## API

`constructor(options)`

构造函数:

* options.time   计算时间
* options.sc     天体球坐标 (距离单位：AU)
* options.system 坐标系统

`get()`

获取 周年视差修正值对象

`get time()`

获取计算时间

`set time(time)`

设置计算时间

[返回主页](../../readme.md)
