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
      // 处理onFulfilled执行结果是一个Promise时的情况
      // 这里可能理解起来有点困难
      // 当value instanof WPromise时，说明当前Promise肯定不会是第一个Promise
      // 而是后续then方法返回的Promise（第二个Promise）
      // 我们要获取的是value中的value值（有点绕，value是个promise时，那么内部存有个value的变量）
      // 怎样将value的value值获取到呢，可以将传递一个函数作为value.then的onFulfilled参数
      // 那么在value的内部则会执行这个函数，我们只需要将当前Promise的value值赋值为value的value即可
      if (value instanceof MyPromise) {
        value.then(
          this._resolve.bind(this),
          this._reject.bind(this)
        );
        return;
      }
      this.value = value;
      this.status = MyPromise.FULFILLED;
      this.callbacks.forEach(cb => this._handleFn(cb));
    }
    _reject(reason) {
      if (reason instanceof MyPromise) {
        reason.then(
          this._resolve.bind(this),
          this._reject.bind(this)
        );
        return;
      }
      this.reason = reason;
      this.status = MyPromise.REJECTED;
      this.callbacks.forEach(cb => this._handleFn(cb));
    }
    then(onFulfilled, onRejected) {
    //   this.callbacks.push({
    //     onFulfilled,
    //     onRejected,
    //   });
    //   return this
        return new MyPromise((nextResolve, nextReject)=>{
            this._handleFn({
                nextResolve,
                nextReject,
                onFulfilled,
                onRejected
            });
        })

    }
    _handleFn(cb) {
        const { onFulfilled, onRejected, nextResolve, nextReject } = cb;

    //   const { onFulfilled, onRejected } = cb;
    //   if (this.status === MyPromise.FULFILLED && onFulfilled) onFulfilled(this.value);
    //   if (this.status === MyPromise.REJECTED && onRejected) onRejected(this.reason);
            
        if (this.status === MyPromise.PENDING) {
            this.callbacks.push(cb);
            return;
        }
        if (this.status === MyPromise.FULFILLED) {
            // 传入存储的值
            // 未传入onFulfilled时，将undefined传入
            const nextValue = onFulfilled ? onFulfilled(this.value) : this.value;
            nextResolve(nextValue);
            return;
        }

        if (this.status === MyPromise.REJECTED) {
            // 传入存储的错误信息
            // 同样的处理
            const nextReason = onRejected ? onRejected(this.reason) : this.reason;
            nextReject(nextReason);
        }
    }
  }


// console.log(new MyPromise(() => {}));
function fetchData() {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('willem');
        }, 1000);
    });
}
const p1 = fetchData().then(data1 => {return data1 + ' wei'});
const p2 = p1.then((data2) => {console.log(data2)}); 
const p3 = p1.then((data3) => {console.log(data3)});
// console.log(p1, 'p1');
// console.log(p2, 'p2');
// console.log(p3, 'p3');

