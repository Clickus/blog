---
title: Symbol.hasInstance
comment: true
sidebar: true
link_reprint:
  - url: null
    title: null
link_refer:
  - url: null
    title: null
date: 2022-11-14 11:13:27
tags:
categories:
---


/**
 * 对象的Symbol.hasInstance属性，指向一个内部方法。
 * 当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。
 * 比如，foo instanceof Foo在语言内部，实际调用的是Foo[Symbol.hasInstance](foo)
 */

<!--more-->

class MyClass {
  /**动态方法 */
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
  /**静态方法 */
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}
var x = new MyClass()
console.log([1, 2, 3] instanceof new MyClass()); // true //我是调用的动态方法
console.log(x[Symbol.hasInstance]([0, 0, 0,]));//true //我是调用的动态方法
console.log(2 instanceof MyClass); //true 我是调用静态方法
console.log(MyClass[Symbol.hasInstance](2));//true 我是调用了静态方法
console.log(x instanceof MyClass); //false 因为修改了静态方法。x本身就是MyClass的实例，如果注释了静态方法就会返回true。


const instance_of = function instance_of(example, classFunc) {
  if(typeof classFunc !== 'function') throw new TypeError('Right-hand side of "instanceof" in not callable') 
  if(example == null) return false
  
  // 支持 Symbol 的并且拥有 Symbol.hasInstance，以这个处理
  if(typeof Symbol !== 'undefined') {
      const hasInstance = classFunc[Symbol.hasInstance]
      if(typeof hasInstance === 'function') {
          return hasInstance.call(classFunc, example)
      } 
  }
  
  // 不支持的则基于检测原型链来实现
  const prototype = classFunc.prototype
  const proto = Object.getPrototypeOf(example)
  // 箭头函数没有原型
  if(!prototype) return false 
  while(true) {
      // 找到 Object.prototype.__proto__ 基类
      if(proto === null) return false
      // 在原型上找到了类的实例
      if(proto === prototype) return true
      proto = Object.getProtoTypeOf(proto)
  }
}

const res = instance_of([12, 23], Array)


// 利用 WeakMap 解决循环引用
let map = new WeakMap()
function deepClone(obj) {
  if (obj instanceof Object) {
    if (map.has(obj)) {
      return map.get(obj)
    }
    let newObj
    if (obj instanceof Array) {
      newObj = []     
    } else if (obj instanceof Function) {
      newObj = function() {
        return obj.apply(this, arguments)
      }
    } else if (obj instanceof RegExp) {
      // 拼接正则
      newobj = new RegExp(obj.source, obj.flags)
    } else if (obj instanceof Date) {
      newobj = new Date(obj)
    } else {
      newObj = {}
    }
    // 克隆一份对象出来
    let desc = Object.getOwnPropertyDescriptors(obj)
    let clone = Object.create(Object.getPrototypeOf(obj), desc)
    map.set(obj, clone)
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepClone(obj[key])
      }
    }
    return newObj
  }
  return obj
}