# SystemCrossLocator

## 简介

SystemCrossLocator 是计算两个天球系统交点位置的计算组件。

## 用例

```js
const { SystemCrossLocator } = require('@behaver/orbital-node-position');
const { HorizontalCoordinate } = require('@behaver/celestial-coordinate');
const { JDateRepository } = require('@behaver/jdate');
const Astraeus = require('@behaver/astraeus.js');

let SCL = new Astraeus.SystemCrossLocator({
  direction: true, // 相交方向
});

// 实例化天球坐标控制组件
let Coord = new Astraeus.Coord({
  obGeoLong: -124.23,
  obGeoLat: 40.08,
  withNutation: true,
  centerMode: 'geocentric',
});

SCL.options({
  sysA: 'hc',
  sysB: 'ecc',
  coordHandler: Coord,
  time: new Astraeus.JDate(new Date(1992, 7, 15, 8, 25), 'date'),
});

let res = SCL.get();

// 输出交点黄经值
console.log(res.coord.longitude.getDegrees());
```

## API

### 属性

* `id` 位置id

* `time` 儒略时间对象

* `sysA` 天球系统 A

* `sysB` 天球系统 B

* `coordHandler` 天球坐标控制器

* `direction` 相交方向

### 方法

`constructor(options)`

构造函数

`options(options)`

设置定位器参数

* options.id           位置id
* options.time         儒略时间对象
* options.sysA         天球系统A
* options.sysB         天球系统B
* options.coordHandler 天球坐标控制器
* options.direction    交点方向

`get(options)`

获取计算结果

[返回主页](../../readme.md)
