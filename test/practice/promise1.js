/**
 * Promise接收一个函数fn，函数里有两个参数函数
 *
 */

const padding = "pending";
const resolved = "resolved";
const rejected = "rejected";

function Promise(fn) {

    this.state = padding;

    this.value = null;
    this.reason = null;

    this.onResolevdCallBacks = [];
    this.onRejectedCallBacks = [];

    let resolve = (res) => {
        console.log("resolve");

        if (this.state === padding) {
            this.state = resolved;
            this.value = res;
            this.onResolevdCallBacks.forEach((f) => f())
        }
    };

    let rejecte = (err) => {
        console.log("rejected");

        if (this.state === padding) {
            this.state = rejected;
            this.reason = err;
            this.onRejectedCallBacks.forEach((f) => f())
        }
    };

    try {
        fn(resolve, rejecte);
    } catch (e) {
        console.log(e);
        rejecte(e)
    }

}

Promise.prototype.then = function (onFulfilled, onRejected) {

    console.log("then");

    let state = this.state;

    if (state === resolved) {
        onFulfilled(this.value);
    }

    if (state === rejected) {
        onRejected(this.reason);
    }

    if (state === padding) {
        this.onResolevdCallBacks.push(() => {
            onFulfilled(this.value)
        });

        this.onRejectedCallBacks.push(() => {
            onRejected(this.reason)
        })
    }

}

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(i);
        resolve("执行成功");
    }, 100)

});
p.then(function (val) {
    console.log("val", val);
}, function (err) {
    console.log("err", err);
})

