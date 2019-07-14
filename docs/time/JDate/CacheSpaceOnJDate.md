# CacheSpaceOnJDate

## 简介

CacheSpaceOnJDate 是依赖 [JDate](./JDate.md) 实例的缓存空间组件，它为调用者提供基于 [JDate](./JDate.md) 时间的缓存空间，实现缓存数据与 [JDate](./JDate.md) 时间的关联有效。在通常的天文算法中，存在着大量基于 [JDate](./JDate.md) 时间的重复运算过程，CacheSpaceOnJDate 可以帮助你避免重复运算，从而有效地节省算法中的运算资源。

## 用例

使用 CacheSpaceOnJDate 进行缓存操作：

```js
const Astraeus = require('@behaver/astraeus.js');

let jdr = new Astraeus.JDate(2446899);

// 构建儒略时间缓存空间
let cache = new Astraeus.CacheSpaceOnJDate(jdr);

// 计算某一天文值
let l = 485868.249036 
	+ 1717915923.2178 * jdr.JDEC 
	+ 31.8792 * jdr.JDECP(2) 
	+ 0.051635 * jdr.JDECP(3) 
	- 0.00024470 * jdr.JDECP(4);

// 缓存数值
cache.set('l', l);

// 输出缓存
console.log(cache.get('l'));
```

## API

`constructor(jdate)`

构造函数，参数缓存空间所依赖的儒略时间组件，必须为 JDate 类的实例

`on(jdate)`

设定缓存空间依赖的 JDate 组件

`set(key, val)`

存入缓存变量

`get(key)`

读取缓存变量

`remove(key)`

清除缓存变量

`has(key)`

判断缓存量是否存在

`clear()`

清空全部缓存空间

[返回主页](../../../readme.md)
