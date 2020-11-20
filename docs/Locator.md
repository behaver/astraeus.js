# Observer

## Intro 简介

Observer 是用于获取星体定位的组件。

## Usage 用例

```js
const Astraeus = require('@behaver/astraeus.js');

// 实例化天体坐标定位控制器
let observer = new Astraeus.Observer;

// 实例化儒略时间
let JDate = new Astraeus.JDate(new Date(1992, 7, 15, 8, 25), 'date');

// 设置定位参数
observer.onObservatory({
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
observer.registerStar({
  id: 'θPersei',
  ra: 41.0500,
  dec: 49.2283,
  pmra: 0.336,
  pmdec: -0.089,
  radvel: 25,
  parallax: 0.089,
});

// 获取月亮坐标结果
let resMoon = observer.get('moon');

// 获取 θPersei 坐标结果
let resThetaPersei = observer.get('θPersei');
```

## API 接口

### Properties 属性

* `time` 观测时间

* `afterResultProcessed` 结果天球坐标处理回调函数（只写）

* `coordHandler` 天球坐标处理组件 (只读)

### Methods 方法

* `constructor()` 

构造函数

* `onObservatory(options)`

设定观测条件数据

  * options.longitude   地理经度（单位：°）
  * options.latitude    地理纬度（单位：°）
  * options.elevation   海拔（单位：m）
  * options.temperature 温度（单位：℃）
  * options.pressure    大气压强（单位：pa）

* `atTime(time)`

设定观测时间

* `withCorrections(options)`

修正项启用

  * options.nutation         章动
  * options.lightTime        光行时
  * options.annualAberration 周年光行差
  * options.annualParallax   周年视差
  * options.atmRefraction    大气折射
  * options.graDeflection    引力偏转
  * options.fk5              FK5偏差

* `useCoordSetting(options)`

配置坐标设定

  * options.system       天球坐标系统
  * options.centerMode   中心模式
  * options.isContinuous 数值是否连续

* `useCalculateSetting(options)`

配置计算设定

  * options.accuracy 精度等级

* `getLocator(name)`

获取星体定位器

* `registerLocator(name, locator)`

注册星体定位器

* `removeLocator(name)`

移除星体定位器

* `registerStar(options)`

注册恒星数据

  * options.id       恒星id
  * options.ra       J2000 平赤经，单位：°
  * options.dec      J2000 平赤纬，单位：°
  * options.parallax 周年视差，单位：角秒
  * options.pmra     赤经自行，单位：角秒每儒略年
  * options.pmdec    赤纬自行，单位：角秒每儒略年
  * options.radvel   日心视向速度，单位：km/s

* `removeStar(star_id)`

移除恒星数据

* `clearStarCategory()`

清空注册星表

* `setAfterResultProcessed(func)`

设置结果天球坐标处理回调函数

* `get(star_id, afterResultProcessed)`

获取星体定位结果

* `getAll(afterResultProcessed)`

获取全部星体定位表

[返回主页](../readme.md)
  