# VSOP87Calculator

## 简介

VSOP87Calculator 是基于 VSOP87 数据及算法的运算器，它是组件库的底层核心组件之一，但并不引出给用户使用。

## 用例

```js
const VSOP87Calculator = require('./VSOP87Calculator');
const dataArray = require('../data/Earth/l');

let calculator = new VSOP87Calculator(new JDateRepository(2446896));

// 计算 VSOP 值
let l = calculator.calc(dataArray, [ 27, 15, 8, 4, 3, 1 ]);

// 估算最大误差
let maxError = calculator.estimateMaxError(dataArray, [ 27, 15, 8, 4, 3, 1 ]);

// 生成瞬时截断值数组
let tNumsArray = calculator.makeTruncationNums(dataArray, 0.000001);

// 生成平均截断值数组
let meanTNumsArray = calculator.makeMeanTruncationNums(dataArray, 0.000001);
```

## API

`constructor(jdr)`

构造函数:

* jdr 儒略时间，JDateRepository 对象

`set jdr(jdr)`

设置 JDateRepository 对象

`get jdr()`

获取 JDateRepository 对象

`calc(dataArray, tNumsArray)`

计算 VSOP87 数据:

* dataArray 数据数组
* tNumsArray 计算截断值数组

`estimateMaxError(dataArray, tNumsArray)`

估算最大误差:

* dataArray 数据数组
* tNumsArray 计算截断值数组

`makeTruncationNums(dataArray, maximumError)`

生成允许最大误差下的瞬时截断值数组:

* dataArray 数据数组
* maximumError 允许最大误差值

`makeMeanTruncationNums(dataArray, maximumError)`

生成允许最大误差下的平均截断值数组

* dataArray 数据数组
* maximumError 允许最大误差值

`makeSafeTruncationNums(dataArray, maximumError)`

生成允许最大误差下的安全截断值数组

* dataArray 数据数组
* maximumError 允许最大误差值

[返回主页](../../../readme.md)
