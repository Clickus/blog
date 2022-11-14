---
title: Bind
comment: true
sidebar: true
link_reprint:
  - url: null
    title: null
link_refer:
  - url: null
    title: null
date: 2022-11-14 16:16:43
tags:
categories:
---


### bind方法相关

##### 特点
  + 返回的是函数， 如果使用需要再次调用
  + 支持柯里化, 参数可以多次传入
  + 绑定函数也可以使用 new 运算符构造，也就是说还可以将 bind 返回的函数作为构造函数

<!--more-->
```js
  // v2.0：支持函数柯里化，分段接收参数
  Function.prototype.bind2 = function (context) {
      // 首先要获取调用bind的函数，也就是绑定函数，用this可以获取
      var self = this; // 用self绑定this，因为下面函数中的this指向已经改变（存放当前函数的this）
      var args = [...arguments].slice(1); // 用slice方法取第二个到最后一个参数（获取除了this指向对象以外的参数）
      return function () {
          // 这里的arguments是指bind返回的函数传入的参数
          var restArgs = [...arguments];
          // 用apply来改变this指向，拼接bind方法传入的参数和bind方法返回的函数传入的参数，统一在最后通过apply执行。
          return self.apply(context, args.concat(restArgs));
      }
  }
```