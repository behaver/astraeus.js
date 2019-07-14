# NewtonSolver

## 简介

NewtonSolver 是基于牛顿法编写的用于求解一元函数的求解工具

## 用例

```js
const Astraeus = require('@behaver/astraeus.js');

// 实例化牛顿求解器，设定 sin 函数为求解函数
let solver = new Astraeus.NewtonSolver({
  f: Math.sin,
  dx: 1e-7,
  bias: 1e-7,
});

// 执行初始值为 3 的求解
solver.solve(3);

// 获取 x 解值
let x = solver.x;
```

## API

### 属性

`f` 求解函数

`dx` dx 值

`bias` 允许偏差范围

`maxIteration` 最大迭代次数

以下为只读属性：

`stepNum` 迭代次数

`x` 当前点 x 值

`y` 当前点 y 值

`derivative` 当前点导数值

### 方法

`constructor(options)`

构造函数:

* `options.f` 求解函数
* `options.dx` dx 值
* `options.bias` 允许偏差范围
* `options.maxIteration` 最大迭代次数

`solve(x)`

求解函数

[返回主页](../../../readme.md)
