# Derivator

## 简介

Derivator 是一个针对一元函数设计的微分求导工具。

## 用例

```js
const Astraeus = require('@behaver/astraeus.js');

// 实例化微分求导器，设定 sin 函数为原函数
let df = new Astraeus.Derivator({
  f: Math.sin,
  dx: 1e-7,
});

// 获取 π 值处的导数值
let res = df.get(Math.PI);
```

## API

### 属性

`f` 原函数

`dx` dx 值

`direction` 求导方向

### 方法

`constructor(options)`

构造函数:

* `options.f` 原函数
* `options.dx` dx 值
* `options.direction` 求导方向

`get(x)`

获取计算结果值

[返回主页](../../../readme.md)
