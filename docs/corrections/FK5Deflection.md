# FK5Deflection

## 简介

FK5Deflection 是一个用于计算 VSOP 动力学坐标与 FK5 坐标之间的偏差的组件

## 用例

```js
const Astraeus = require('@behaver/astraeus.js');

let FK5D = new Astraeus.FK5Deflection({
  time: new Astraeus.JDate(18, 'j2000'),
  sc: new Astraeus.SphericalCoordinate3D(230043, 1.123, 1.55),
});

let res = FK5D.get();
```

## API

`constructor(options)`

构造函数:

* options.time   计算时间
* options.sc     天体球坐标 (距离单位：AU)
* options.system 坐标系统

`get()`

获取 FK5 修正值对象

`get time()`

获取计算时间

`set time(time)`

设置计算时间

[返回主页](../../readme.md)
