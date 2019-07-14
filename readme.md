# AstraeusJS

[![GitHub license](https://img.shields.io/badge/license-ISC-brightgreen.svg)](#) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/@behaver/astraeus.js) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)

## Intro 简介

AstraeusJS 是一个基于 JavaScript 开发的天文计算组件库。

## Usage 用例

```js
const Astraeus = require('@behaver/astraeus.js');

// 实例化天体坐标定位控制器
let L = new Astraeus.Locator;

// 实例化儒略时间
let JDate = new Astraeus.JDate(new Date(1992, 7, 15, 8, 25), 'date');

// 设置定位参数
L.onObservatory({
  longitude: -124.23,
  latitude: 40.07,
  elevation: 100,
  temperature: 23.5,
}).withCorrections({
  nutation: 3,
  lightTime: 3,
  annualAberration: 3,
  annualParallax: 3,
  atmRefraction: 3,
  graDeflection: 3,
  fk5: 0,
}).useCoordSetting({
  system: 'ecc',
  centerMode: 'geocentric',
  isContinuous: false,
}).atTime(JDate);

// 注册恒星 θPersei
L.registerStar({
  id: 'θPersei',
  ra: 41.0500,
  dec: 49.2283,
  pmra: 0.336,
  pmdec: -0.089,
  radvel: 25,
  parallax: 0.089,
});

// 获取月亮坐标结果
let resMoon = L.get('moon');

// 获取 θPersei 坐标结果
let resThetaPersei = L.get('θPersei');
```

## Reference 涉及

### Locator 定位器

* [SunLocator](./docs/locators/SolarStarLocator.md) 太阳定位器
* [MercuryLocator](./docs/locators/SolarStarLocator.md) 水星定位器
* [VenusLocator](./docs/locators/SolarStarLocator.md) 金星定位器
* [EarthLocator](./docs/locators/SolarStarLocator.md) 地球定位器
* [MoonLocator](./docs/locators/SolarStarLocator.md) 月球定位器
* [MarsLocator](./docs/locators/SolarStarLocator.md) 火星定位器
* [JupiterLocator](./docs/locators/SolarStarLocator.md) 木星定位器
* [SaturnLocator](./docs/locators/SolarStarLocator.md) 土星定位器
* [UranusLocator](./docs/locators/SolarStarLocator.md) 天王星定位器
* [NeptuneLocator](./docs/locators/SolarStarLocator.md) 海王星定位器
* [PlutoLocator](./docs/locators/SolarStarLocator.md) 冥王星定位器
* [FixedStarLocator](./docs/locators/FixedStarLocator.md) 恒星定位器
* [SystemCrossLocator](./docs/locators/SystemCrossLocator.md) 系统交点定位器
* [StarPlaneCrossLocator](./docs/locators/SolarStarLocator.md) 轨道和系统交点定位器

### Coord 天球坐标

* [HorizontalCoordinate](./docs/coords/HorizontalCoordinate.md) 地平坐标
* [HourAngleCoordinate](./docs/coords/HourAngleCoordinate.md) 时角坐标
* [EquinoctialCoordinate](./docs/coords/EquinoctialCoordinate.md) 赤道坐标
* [EclipticCoordinate](./docs/coords/EclipticCoordinate.md) 黄道坐标
* [GalacticCoordinate](./docs/coords/GalacticCoordinate.md) 银道坐标
* [SystemSwitcher](./docs/coords/SystemSwitcher.md) 坐标系统转换器

### Correction 天文修正

* [Precession](./docs/corrections/Precession.md) 岁差
* [Nutation](./docs/corrections/Nutation.md) 章动
* [AnnualAberration](./docs/corrections/AnnualAberration.md) 周年光行差
* [AnnualParallax](./docs/corrections/AnnualParallax.md) 周年视差
* [DiurnalParallax](./docs/corrections/DiurnalParallax.md) 周日视差
* [AtmosphericRefraction](./docs/corrections/AtmosphericRefraction.md) 大气折射
* [FK5Deflection](./docs/corrections/FK5Deflection.md) FK5偏差
* [GravitationalDeflection](./docs/corrections/GravitationalDeflection.md) 引力偏转

### Calculator 定位计算

* [SolarPlanetsCalculator](./docs/calculators/SolarPlanetsCalculator/SolarPlanetsCalculator.md) 太阳系行星定位计算
* [MoonELP2000Calculator](./docs/calculators/MoonELP2000Calculator.md)月球定位计算
* [Pluto99Calculator](./docs/calculators/Pluto99Calculator.md) 冥王星定位计算
* [FixedStarCalculator](./docs/calculators/FixedStarCalculator.md) 恒星定位计算
* [EarthSSBCalculator](./docs/calculators/EarthSSBCalculator.md) 地球SSB定位计算

### Time 时间

* [JDate](./docs/time/JDate/JDate.md) 儒略时间
* [SiderealTime](./docs/time/SiderealTime.md) 恒星时
* [UTDelay](./docs/time/UTDelay.md) 力学时和世界时差值计算

### Velocity 速度

* [CelestialVelocity](./docs/velocity/CelestialVelocity.md) 天球速度

### Math 数学

* [Angle](./docs/math/Angle.md) 角度
* [Coordinate](./docs/math/Coordinate/Coordinate.md) 空间坐标
* [Derivator](./docs/math/UnaryToolkit/Derivator) 函数求导
* [NewtonSolver](./docs/math/UnaryToolkit/NewtonSolver) 牛顿法求解

## License 许可证书

The ISC license.
