// https://www.jianshu.com/p/7c5cec56f0f6
// 完整代码 也顺便带大家理顺一下
function Promise(executor) {
    let self = this;
    self.value = undefined;  // 成功的值
    self.reason = undefined;  // 失败的值
    self.status = 'pending'; // 目前promise的状态pending
    self.onResolvedCallbacks = []; // 可能new Promise的时候会存在异步操作，把成功和失败的回调保存起来
    self.onRejectedCallbacks = [];

    function resolve(value) { // 把状态更改为成功
        if (self.status === 'pending') { // 只有在pending的状态才能转为成功态
            self.value = value;
            self.status = 'resolved';
            self.onResolvedCallbacks.forEach(fn => fn()); // 把new Promise时异步操作，存在的成功回调保存起来
        }
    }

    function reject(reason) {  // 把状态更改为失败
        if (self.status === 'pending') { // 只有在pending的状态才能转为失败态
            self.reason = reason;
            self.status = 'rejected';
            self.onRejectedCallbacks.forEach(fn => fn()); // 把new Promise时异步操作，存在的失败回调保存起来
        }
    }

    try {
        // 在new Promise的时候，立即执行的函数，称为执行器
        executor(resolve, reject);
    } catch (e) { // 如果执行executor抛出错误，则会走失败reject
        reject(e);
    }
}

// 这个函数为核心，所有的promise都遵循这个规范
// 主要是处理then中返回的值x和promise2的关系
function resolvePromise(promise2, x, resolve, reject) {
    // 当promise2和then返回的值x为同一个对象时，变成了自己等自己，会陷入死循环
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle'));
    }
    let called;
    // x可能是一个promise也可能是一个普通值
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, err => {
                    if (called) return;
                    called = true;
                    reject(err);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

// then调用的时候，都是属于异步，是一个微任务
// 微任务会比宏任务先执行
// onFulfilled为成功的回调，onRejected为失败的回调
Promise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
    onRejected = typeof onRejected === 'function' ? onRejected : err => {
        throw err
    }
    let self = this;
    let promise2;
    // 上面讲了，promise和jquery的区别，promise不能单纯返回自身，
    // 而是每次都是返回一个新的promise，才可以实现链式调用，
    // 因为同一个promise的pending resolve reject只能更改一次
    promise2 = new Promise((resolve, reject) => {
        if (self.status === 'resolved') {
            // 为什么要加setTimeout？
            // 首先是promiseA+规范要求的
            // 其次是大家写的代码，有的是同步，有的是异步
            // 所以为了更加统一，就使用为setTimeout变为异步了，保持一致性
            setTimeout(() => {
                try { // 上面executor虽然使用try catch捕捉错误
                    // 但是在异步中，不一定能够捕捉，所以在这里
                    // 用try catch捕捉
                    let x = onFulfilled(self.value);
                    // 在then中，返回值可能是一个promise，所以
                    // 需要resolvePromise对返回值进行判断
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }, 0)
        }

        if (self.status === 'rejected') {
            setTimeout(() => {
                try {
                    let x = onRejected(self.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }, 0)
        }
        if (self.status === 'pending') {
            self.onResolvedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0)
            });
            self.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0)
            });
        }
    });
    return promise2
}
Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}
// 内部实现
Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected) // 相当于then里的成功回调只传个null
}


// 内部实现
Promise.all = function (promises) { // promises 是一个数组
    return new Promise((resolve, reject) => {
        let arr = []
        let i = 0

        function processData(index, data) {
            arr[index] = data
            // 5.我们能用arr.length === promises.length来判断请求是否全部完成吗？
            // 答案是不行的，假设arr[2] = 'hello swr'
            // 那么打印这个arr，将是[empty × 2, "hello swr"]，
            // 此时数组长度也是为3，而数组arr[0] arr[1]则为空
            // 那么换成以下的办法
            if (++i === promises.length) { // 6.利用i自增来判断是否都成功执行
                resolve(arr) // 此时arr 为['hello','swr']
            }
        }

        for (let i = 0; i < promises.length; i++) { // 1.在此处遍历执行
            promises[i].then((data) => { // 2.data是成功后返回的结果
                processData(i, data) // 4.因为Promise.all最终返回的是一个数组成员按照顺序排序的数组
                                     // 而且异步执行，返回并不一定按照顺序
                                     // 所以需要传当前的i
            }, reject) // 3.如果其中有一个失败的话，则调用reject
        }
    })
}

// 内部实现
Promise.race = function (promises) { // promises 是一个数组
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject) // 和上面Promise.all有点类似
        }
    })
}


module.exports = Promise;

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(i);
        resolve('看看同时执行resolve和reject会发生什么!')  // 5.此行执行resovle
    }, 1)

});
p.then(function (ret) {
    console.log("ret", ret);
}, function (err) {
    console.log("err", err);
})
