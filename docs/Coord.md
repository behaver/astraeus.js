# Coord

## 简介

Coord 是一个基于 NodeJS 开发的天文学坐标计算工具，主要可被用于天体天球坐标的转换和处理。

其中包含的天球坐标组件分别有：

* [HorizontalCoordinate](./coords/HorizontalCoordinate.md) 天球地平坐标
* [HourAngleCoordinate](./coords/HourAngleCoordinate.md) 天球时角坐标（也称第一赤道坐标）
* [EquinoctialCoordinate](./coords/EquinoctialCoordinate.md) 天球赤道坐标
* [EclipticCoordinate](./coords/EclipticCoordinate.md) 天球黄道坐标
* [GalacticCoordinate](./coords/GalacticCoordinate.md) 天球银道坐标
* [SystemSwitcher](./coords/SystemSwitcher.md)
天球坐标转换组件

*点击上述链接，可查看它们的详细文档。*

## 用例

```js
const Astraeus = require('@behaver/astraeus.js');

// 构建天球坐标实例
let CC = new Astraeus.Coord({
  withNutation: true,
  withAnnualAberration: true,
});

// 生成黄道坐标对象
let ECC = CC.create('ecc', {
  time: new Astraeus.JDate(2446896),
  longitude: 125.88,
  latitude: 32.45,
});

// 转换至赤道坐标对象
let EQC = CC.transform(ECC).to('eqc');

// 输出赤道经度度数
console.log(EQC.longitude.getDegrees());
```

## API

### 属性

`options` 天球坐标参数项对象

### 方法

`constructor(options)`

构造函数

`create(sys, opts)`

生成天球坐标对象：

* sys 天球系统
* opts 选项参数

`transform(coord, options)`

转换天球坐标：

* coord 起始坐标对象
* options 起始坐标参数选项

[返回主页](../readme.md)
