# EquinoctialCoordinate

## 简介

EquinoctialCoordinate 是用于处理天球赤道坐标的组件。

它可以通过便捷地方法，使天球赤道坐标于不同的坐标系统参数之间进行切换。也可以将当前任意天球赤道坐标转换至其他天球坐标系统。

赤道坐标修正项包括有：

* 章动
* 岁差

二次修正项：

* FK5
* 周年光行差
* 太阳引力偏转

## 用例

使用 EquinoctialCoordinate 组件处理天球赤道坐标：

```js
const Astraeus = require('@behaver/astraeus.js');

// 实例化 J2000 分点天球平赤道坐标
let ec = new Astraeus.EquinoctialCoordinate({
  longitude: 123.2343,
  latitude: -3.3248,
  radius: 1.0324,
});

let jdr = new Astraeus.JDate(2446896);

// 设定新坐标条件，分点历元以及进行章动、光行差修正
ec.on({
  epoch: jdr,
  withNutation: true,
  withAnnualAberration: true,
});

let longitude = ec.longitude.getDegrees();

let latitude = ec.latitude.getDegrees();

let radius = ec.radius;

let sc = ec.sc;

let epoch = ec.epoch;

let withNutation = ec.withNutation;

let withAnnualAberration = ec.withAnnualAberration;
```

## API

### 属性

`epoch` 观测历元

`sc` 天球球坐标

`longitude` 经度

`latitude` 纬度

`radius` 中心距离

`isContinuous` 结果值连续性

`enableNutation` 章动修正功能启用状态

`enableAnnualAberration` 周年光行差功能启用状态

`enableGravitationalDeflection` 引力偏转功能启用状态

`enableFK5` FK5 修正功能启用状态

`withNutation` 章动修正状态

`withAnnualAberration` 周年光行差修正状态

`withGravitationalDeflection` 引力偏转修正状态

`onFK5` FK5 修正状态

只读属性：

`PrecessionCorrection` 岁差 偏转修正值

`NutationCorrection` 章动 偏转修正值

`AACorrection` 周年光行差修正值

`GDCorrection` 太阳引力偏转修正值

`FK5Correction` FK5 偏转修正值

### 方法

`constructor(options)`

构造函数

* options.isContinuous 结果坐标值是否连续，默认：false

接受参数和 `from` 方法相同。

`from(options)`

设定起始天球赤道坐标。

* options.epoch 坐标历元

坐标参数：

* options.sc 球坐标

或

* options.longitude 赤经，单位：度
* options.latitude 赤纬，单位：度
* options.radius 距离半径，值域：[10e-8, +∞)

其他参数：

* options.enableNutation 章动修正功能启用状态
* options.enableAnnualAberration 周年光行差功能启用状态
* options.enableGravitationalDeflection 引力偏转功能启用状态
* options.enableFK5 FK5 修正功能启用状态
* options.withNutation 坐标是否含有章动修正
* options.withAnnualAberration 坐标是否含有周年光行差
* options.withGravitationalDeflection 坐标是否含有引力偏转
* options.onFK5 坐标是否含有 FK5 修正

`on(options)`

转换当前坐标所基于的系统参数

接受参数：

* options.epoch 坐标历元

修正项参数：

* options.enableNutation 章动修正功能启用状态
* options.enableAnnualAberration 周年光行差功能启用状态
* options.enableGravitationalDeflection 引力偏转功能启用状态
* options.enableFK5 FK5 修正功能启用状态
* options.withNutation 坐标是否含有章动修正
* options.withAnnualAberration 坐标是否含有周年光行差
* options.withGravitationalDeflection 坐标是否含有引力偏转
* options.onFK5 坐标是否含有 FK5 修正

`position(options)`

设定当前系统条件下的坐标点位置

坐标参数：

* options.sc 球坐标

或

* options.longitude 赤经，单位：度
* options.latitude 赤纬，单位：度
* options.radius 距离半径，值域：[10e-8, +∞)

`get(options)`

获取指定系统参数的坐标结果

接受参数：

* options.epoch 坐标历元

修正项参数：

* options.enableNutation 章动修正功能启用状态
* options.enableAnnualAberration 周年光行差功能启用状态
* options.enableGravitationalDeflection 引力偏转功能启用状态
* options.enableFK5 FK5 修正功能启用状态
* options.withNutation 坐标是否含有章动修正
* options.withAnnualAberration 坐标是否含有周年光行差
* options.withGravitationalDeflection 坐标是否含有引力偏转
* options.onFK5 坐标是否含有 FK5 修正

返回结果对象的属性：

* sc 球坐标
* epoch 坐标历元
* enableNutation 章动修正功能启用状态
* enableAnnualAberration 周年光行差功能启用状态
* enableGravitationalDeflection 引力偏转功能启用状态
* enableFK5 FK5 修正功能启用状态
* withNutation 是否修正了章动
* withAnnualAberration 坐标是否含有周年光行差
* withGravitationalDeflection 坐标是否含有引力偏转
* onFK5 坐标是否含有 FK5 修正

`onJ2000()`

转换坐标历元至 J2000

`onEpoch(epoch)`

转换坐标至 目标历元

`patchNutation()`

修正章动

`unpatchNutation()`

解除章动修正

`patchAnnualAberration()`

修正周年光行差

`unpatchAnnualAberration()`

解除周年光行差修正

`patchGravitationalDeflection()`

修正引力偏转

`unpatchGravitationalDeflection()`

解除引力偏转修正

`patchFK5()`

修正至 FK5 系统

`unpatchFK5()`

解除 FK5 修正

[返回主页](../../readme.md)
