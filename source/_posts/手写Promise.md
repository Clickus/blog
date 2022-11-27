---
title: 手写Promise
comment: true
sidebar: true
# link_reprint:
#   - url: null
#     title: null
link_refer:
  - url: https://segmentfault.com/a/1190000023180502
    title: 手写Promise - 实现一个基础的Promise
date: 2022-11-21 22:52:34
tags: 手写系列
categories:
---

> Promise 是异步编程的一种解决方案。
> 将嵌套调用改为链式调用(then)，增加了可阅读性和可维护性
> 手写一个掌握原理

<!--more-->

- # 历史背景

  - 传统代码 嵌套层数过多，可读性和可以维护性都会变得很差
    - 嵌套调用 (回调地狱)
    - 处理异步请求并发

- # 简单实现一个 Promise

  - ## **第一步**

    **promise 是一个类;它的构造函数接受一个函数，函数的两个参数也都是函数**

    ***

    ```js
    class WPromise {
      constructor(executor) {
        // 这里绑定this是为了防止执行时this的指向改变，this的指向问题，这里不过多赘述
        executor(this._resolve.bind(this), this._reject.bind(this));
      }
      _resolve() {}
      _reject() {}
    }
    ```

  ***

  - ## **第二步**

    **在传入的函数中执行 resolve 表示成功，执行 reject 表示失败，传入的值会传给 then 方法的回调函数 (存在三种状态 且状态不可逆)**

    ***

    ####

    - pending 初始状态，既不是成功，也不是失败状态。等待 resolve 或者 reject 调用更新状态
    - fulfilled 意味着操作成功完成
    - rejected 意味着操作失败

    ***

    - pending 转换为 fulfilled，只能由 resolve 方法完成转换
    - pending 转换为 rejected，只能由 reject 方法完成转换

    ```js
    class WPromise {
      static pending = "pending";
      static fulfilled = "fulfilled";
      static rejected = "rejected";
      constructor(executor) {
        this.status = WPromise.pending; // 初始化状态为pending
        this.value = undefined; // 存储 this._resolve 即操作成功 返回的值
        this.reason = undefined; // 存储 this._reject 即操作失败 返回的值
        executor(this._resolve.bind(this), this._reject.bind(this));
      }
      _resolve(value) {
        this.value = value;
        this.status = WPromise.fulfilled; // 将状态设置为成功
      }
      _reject(reason) {
        this.reason = reason;
        this.status = WPromise.rejected; // 将状态设置为失败
      }
    }
    ```

  ***

  - ## **第三步**

    **Promise 有一个叫做 then 的方法，该方法有两个参数，第一个参数是成功之后执行的回调函数，第二个参数是失败之后执行的回调函数。then 方法在 resolve 或者 reject 执行之后才会执行，并且 then 方法中的值是传给 resolve 或 reject 的参数**

    ***

    ```js
    class WPromise {
      static pending = "pending";
      static fulfilled = "fulfilled";
      static rejected = "rejected";

      constructor(executor) {
        this.status = WPromise.pending; // 初始化状态为pending
        this.value = undefined; // 存储 this._resolve 即操作成功 返回的值
        this.reason = undefined; // 存储 this._reject 即操作失败 返回的值
        // 存储then中传入的参数
        // 至于为什么是数组呢？因为同一个Promise的then方法可以调用多次
        this.callbacks = [];
        executor(this._resolve.bind(this), this._reject.bind(this));
      }

      // onFulfilled 是成功时执行的函数
      // onRejected 是失败时执行的函数
      then(onFulfilled, onRejected) {
        // 这里可以理解为在注册事件
        // 也就是将需要执行的回调函数存储起来
        this.callbacks.push({
          onFulfilled,
          onRejected,
        });
      }

      _resolve(value) {
        this.value = value;
        this.status = WPromise.fulfilled; // 将状态设置为成功

        // 通知事件执行
        this.callbacks.forEach(cb => this._handler(cb));
      }

      _reject(reason) {
        this.reason = reason;
        this.status = WPromise.rejected; // 将状态设置为失败

        this.callbacks.forEach(cb => this._handler(cb));
      }

      _handler(callback) {
        const { onFulfilled, onRejected } = callback;

        if (this.status === WPromise.fulfilled && onFulfilled) {
          // 传入存储的值
          onFulfilled(this.value);
        }

        if (this.status === WPromise.rejected && onRejected) {
          // 传入存储的错误信息
          onRejected(this.reason);
        }
      }
    }
    ```

    ***

    ## **自己实现**

    - 构造函数执行器函数 executor 接受两个函数 一个成功回调(返回值) 一个失败回调(返回原因)
      - 构造器中初始化一些变量
    - 存在三种状态 流转不可逆 pending-->fulfilled pending-->rejected
      - resolve reject 函数设置成功值 设置失败原因 以及状态值
    - then 方法
      - 第一个参数是成功之后执行的回调函数
      - 第二个参数是失败之后执行的回调函数
      - then 方法在 resolve 或者 reject 执行之后才会执行，并且 then 方法中的值是传给 resolve 或 reject 的参数
    - 暂存 注册 then 中方法 { onFulfilled, onRejected }
      - 执行 resolve 是遍历执行 onFulfilled ==> value
      - 执行 reject 是遍历执行 onRejected ==> reason

    ```js
    class MyPromise {
      static PENDING = "pending";
      static FULFILLED = "fulfilled";
      static REJECTED = "rejected";
      constructor(executor) {
        this.value = undefined;
        this.reason = undefined;
        this.status = MyPromise.PENDING;
        this.callbacks = [];
        executor(this._resolve.bind(this), this._reject.bind(this));
      }
      _resolve(value) {
        this.value = value;
        this.status = MyPromise.FULFILLED;
        this.callbacks.forEach(cb => _handleFn(cb));
      }
      _reject(reason) {
        this.reason = reason;
        this.status = MyPromise.REJECTED;
        this.callbacks.forEach(cb => _handleFn(cb));
      }
      then(onFulfilled, onRejected) {
        this.callbacks.push({
          onFulfilled,
          onRejected,
        });
      }
      _handleFn(cb) {
        const { onFulfilled, onRejected } = cb;
        if (this.status === MyPromise.FULFILLED && onFulfilled) onFulfilled(this.value);
        if (this.status === MyPromise.REJECTED && onRejected) onRejected(this.reason);
      }
    }
    new MyPromise(() => {});
    ```
