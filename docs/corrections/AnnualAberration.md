# AnnualAberration

## 简介

AnnualAberration 是一个用于计算天体周年光行差的组件。

本组件计算支持的坐标系统有：赤道坐标和黄道坐标，计算结果的历元标准为 J2000 历元，单位为：弧度。

## 用例

```js
const Astraeus = require('@behaver/astraeus.js');

let AA = new Astraeus.AnnualAberration({
  time: new Astraeus.JDate(18, 'j2000'),
  sc: new Astraeus.SphericalCoordinate3D(1, 1.123, 1.55),
  system: 'ecliptic',
});

let res = AA.get();
```

## API

`constructor(options)`

构造函数:

* options.time   计算时间
* options.sc     天体球坐标
* options.system 坐标系统

`get()`

获取周年光行差

`get time()`

获取计算时间

`set time(time)`

设置计算时间

[返回主页](../../readme.md)
