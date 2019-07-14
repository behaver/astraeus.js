# Angle

## 简介

Angle 是一个用于处理 **角度单位** 的JS模块，创造它目的是为了 *更方便的转换和处理角度数值*。它可以将任意角度单位数值进行 *转换* 。例如：将一个以 *度* 为单位数值转换为以 *弧度*。类似于JS中 Date 对象对时间处理，Angle 也可以将你的角度数值作为一个字符串输出，例如：30°24′32.087″。

## 功能

1. 各种 *角度单位* 下的数值的转化处理
2. 读取/生成 *角度值* 标准化字符串
3. 转换 *角度值* 至任意指定圆周范围内

## 用例

角度单位间数值的转换：

```js
const Astraeus = require('@behaver/astraeus.js');

let a = new Astraeus.Angle;
a.setRadians(Math.PI);
console.log(a.getDegrees());
```

本例将 **弧度值** 转化为 **角度值** ，将会输出数值： *180*

-----

更简洁地，你可以通过 Angle 构造函数参数初始化对象：

```js
const Astraeus = require('@behaver/astraeus.js');

let a = new Astraeus.Angle(15, 'th');
console.log(a.getDegrees());
```

本例初始化了一个 *时角* 为 *15* 的角度对象，最后输出： *225*

Angle 构造函数的第二个参数为 *角度单位* ，可用参数包含：

* `d` 角度
* `m` 角分
* `s` 角秒
* `ms` 角毫秒
* `r` 弧度
* `th` 时角时
* `tm` 时角分
* `ts` 时角秒
* `tms` 时角毫秒
* `hac` 复合时角对象
* `dac` 复合度角对象
* `hacs` 复合时角字符串
* `dacs` 复合度角字符串

-----

使用 *复合角度对象* 并输出 *复合字符串* ：

```js
const Astraeus = require('@behaver/astraeus.js');

let a = new Astraeus.Angle;
a.setDAComplex(130, 20, 30, 865);
console.log(a.makeHACString());
a.setHAComplex({
	h: 3,
	m: 24,
	s: 30,
	ms: 453,
});
console.log(String(a));
```

本例先后给定了 130°20′20.865″ 和 3h24m30s453ms 两个角度值，最后分别输出：

`8h 41m 22s 57.67ms` 和 `51°7′36.795″`

---

使用 *复合字符串* 定义角度值：

```js
const Astraeus = require('@behaver/astraeus.js');

let a = new Astraeus.Angle('33°33′33.333″', 'dac');
// 或者你也可以使用下面这种方法定义
// a.parseDACString('33°33′33.333″');
console.log(a.getDAComplex());

let b = new Astraeus.Angle;
b.parseHACString('12h 23m 34s 456ms');
console.log(b.getHAComplex());
```

本例输出：

`{ d: 33, m: 33, s: 33, ms: 333 }` 和 `{ h: 12, m: 23, s: 34, ms: 456 }`

---

将 *角度值* 转换至给定的 *圆周范围* 内：

```js
const Astraeus = require('@behaver/astraeus.js');

let a = new Astraeus.Angle(361, 'd');
console.log(a.inRound().getDegrees());
console.log(a.inRound(360).getDegrees());
console.log(a.inRound(2 * Math.PI, 'r').getDegrees());
```

本例输出：`1` 、 `361` 和 `361`

## API

`getDegrees()`
以 **角度** 为单位，获取角度数值

`setDegrees(num)`
以 **角度** 为单位，设置角度数值

`getMinutes()`
以 **角分** 为单位，获取角度数值

`setMinutes(num)`
以 **角分** 为单位，设置角度数值

`getSeconds()`
以 **角秒** 为单位，获取角度数值

`getSeconds(num)`
以 **角秒** 为单位，设置角度数值

`getMilliseconds()`
以 **角毫秒** 为单位，获取角度数值

`setMilliseconds(num)`
以 **角毫秒** 为单位，设置角度数值

`getRadian()`
以 **弧度** 为单位，获取角度数值

`setRadian(num)`
以 **弧度** 为单位，设置角度数值

`getTHours()`
以 **时角时** 为单位，获取角度数值

`setTHours(num)`
以 **时角时** 为单位，设置角度数值

`getTMinutes()`
以 **时角分** 为单位，获取角度数值

`setTMinutes(num)`
以 **时角分** 为单位，设置角度数值

`getTSeconds()`
以 **时角秒** 为单位，获取角度数值

`setTSeconds(num)`
以 **时角秒** 为单位，设置角度数值

`getTMilliseconds()`
以 **时角毫秒** 为单位，获取角度数值

`setTMilliseconds(num)`
以 **时角毫秒** 为单位，设置角度数值

`getHAComplex()`
以 **复合时角** 获取角度数值

`setHAComplex(h, m, s, ms)`
以 **复合时角** 设置角度数值

`getDAComplex()`
以 **复合度角** 获取角度数值

`setDAComplex(d, m, s, ms)`
以 **复合度角** 设置角度数值

`parseHACString(str)`
解析 **复合时角字符串**，并以结果设置角度数值

`makeHACString()`
生成 **复合时角字符串**

`parseDACString(str)`
解析 **复合度角字符串**，并以结果设置角度数值

`makeDACString()`
生成 **复合度角字符串**

`toString()`
获取 **复合度角** 字符串

`inRound(from, unit)`
转换角度至 *[from, from+360°)* 的数值范围。unit 参数用于指定 from 的单位，包含以下取值：

* `d` 角度
* `m` 角分
* `s` 角秒
* `ms` 角毫秒
* `r` 弧度
* `th` 时角时
* `tm` 时角分
* `ts` 时角秒
* `tms` 时角毫秒

其中 from 参数的缺省值为 0，unit 参数的缺省值为 'd'

[返回主页](../../readme.md)
