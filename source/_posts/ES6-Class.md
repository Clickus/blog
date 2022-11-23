---
title: ES6_Class
comment: true
sidebar: true
link_reprint:
  - url: null
    title: null
link_refer:
  - url: https://blog.csdn.net/weixin_39872893/article/details/112177116
    title: es6 类的私有属性_ES6 Class 类总结
date: 2022-11-23 23:07:24
tags: es6
categories: js
---

ES Class 里的一些小知识

<!--more-->

- 静态属性指的是 Class 本身的属性， 即 Class.propname， 而不是定义在实例对象（ this） 上的属性 new 类 不会出现该属性
- 实例属性 只能写在类的 constructor 方法里面 使用 new 关键字 就能看到类实例上的属性

```js
class MyClass {
  // 静态属性
  static name = "name11";
  // 实例属性
  age = 18;
  constructor() {
    // 此时用this访问会是undefind
    console.log(this.name); //undefind
    // 正确的访问方法是
    console.log(MyClass.name); //name11

    console.log(MyClass.age); //undefind
    console.log(this.age); //18
  }
}

new MyClass();
```
