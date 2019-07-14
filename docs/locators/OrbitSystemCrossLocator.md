# OrbitSystemCrossLocator

## 简介

OrbitSystemCrossLocator 是计算行星轨道与天球系统基面交点位置的计算组件。

## 用例

```js
const Astraeus = require('@behaver/astraeus.js');

// 实例化儒略时间
let jdate = new Astraeus.JDate(new Date(1992, 7, 15, 8, 25), 'date');

// 实例化月球位置计算组件
let ML = new Astraeus.MoonLocator({
  time: jdate,
  withLTE: true,
});

// 实例化轨道与基本平面交点位置计算组件
let OSCL = new Astraeus.OrbitSystemCrossLocator({
  time: jdate,
  orbit: ML,
  direction: false, // 设定方向，求下降交点
  sys: 'ecc',
});

// 开启章动修正
OSCL.coordHandler.options.withNutation = true;

let {
  id,
  time, // 相交时间
  coord, // 交点坐标
  direction, // 相交方向（升、降）
} = OSCL.get();

```

## API

### 属性

* `id` 位置id

* `time` 儒略时间对象

* `orbit` 轨道坐标源

* `sys` 天球系统

* `direction` 相交方向

* `coordHandler` 天球坐标处理组件

### 方法

`constructor(options)` 

构造函数

`options(options)`

设置定位器计算参数

* options.id           位置id
* options.time         儒略时间对象
* options.orbit        轨道坐标源
* options.direction    相交方向
* options.sys          天球系统
* options.coordHandler 天球坐标处理组件

`get(options)`

获取计算结果

[返回主页](../../readme.md)
