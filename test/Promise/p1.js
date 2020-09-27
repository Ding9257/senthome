const Padding = "Padding";
const Resolved = "Resolved";
const Rejected = "Rejected";

const isFunction = val => typeof val === "function";


function Promise(fn) {

    this.state = Padding;
    this.value = null;
    this.reason = null;

    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (res) => {

        if (this.state === Padding) {

            console.log("resolve执行");

            this.state = Resolved;
            this.value = res;

            this.onResolvedCallbacks.forEach(f => f());
        }
    };

    let rejected = (err) => {

        if (this.state === Padding) {
            console.log("rejected执行");

            this.state = Rejected;

            this.reason = err;

            this.onRejectedCallbacks.forEach(f => f());
        }
    };

    try {
        fn(resolve, rejected);
    } catch (e) {
        rejected(e);
    }
}

function resolvedPromise(promise2, x, resolved, rejected) {
    // promise2 不能与 x是同一个值  陷入死循环

    // x如果为空 返回resolved
    // x如果为普通值或promise

    let called; // 不理解
    if (x !== null && (typeof x === "object" || typeof x === "function")) {

        try {
            let then = x.then;
            if (typeof then === "function") {

                then.call(x, y => {
                    // if (called) return;
                    called = true;
                    resolvedPromise(promise2, y, resolved, rejected)
                }, err => {
                    // if (called) return;
                    called = true;
                    rejected(err);
                })
            } else {
                resolved(x);
            }
        } catch (e) {
            // if (called) return;
            called = true;
            rejected(e);
        }
    } else {
        resolved(x);
    }

}

Promise.prototype.then = function (onResolved, onRejected) {

    console.log("then执行");

    onResolved = typeof onResolved === "function" ? onResolved : val => val;
    onRejected = typeof onRejected === "function" ? onRejected : err => {
        throw err
    }

    let self = this;

    let promise2;
    promise2 = new Promise((resolved, rejected) => {
        let state = self.state;

        if (state == Resolved) {

            setTimeout(() => {
                try {
                    let x = onResolved(self.value);

                    resolvedPromise(promise2, x, resolved, rejected);

                } catch (e) {
                    rejected(e);
                }
            }, 1);

        }

        if (state === Rejected) {

            setTimeout(() => {
                try {
                    let x = onRejected(self.reason);
                    resolvedPromise(promise2, x, resolved, rejected);
                } catch (e) {
                    rejected(e);
                }
            }, 1);
        }

        if (state === Padding) {
            this.onResolvedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onResolved(self.value);
                        resolvedPromise(promise2, x, resolved, rejected);
                    } catch (e) {
                        rejected(e);
                    }
                }, 1);
            });

            this.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(self.reason);
                        resolvedPromise(promise2, x, resolved, rejected);
                    } catch (e) {
                        rejected(e);
                    }
                }, 1);
            });
        }
    });

    return promise2;


};

Promise.prototype.resolve = function (res) {
    return new Promise((resolve) => resolve(res))
}

Promise.prototype.reject = function (err) {
    return new Promise((resolve, rejecte) => {
        rejecte(err)
    })
}

Promise.prototype.all = function (promiseTask) {
    return new Promise((resolve, rejected) => {

        let values = [];
        let count = 0;

        for (let i = 0; i < promiseTask.length; i++) {
            promiseTask[i].then((res) => {

                values[i] = res;

                count++;

                if (count === promiseTask.length) resolve(values);

            }, err => {
                rejected(err)
            });
        }
    })
}

Promise.prototype.race = function (promiseTask) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promiseTask.length; i++) {
            promiseTask[i].then((res) => {
                resolve(res);
            }, err => reject(err));
        }
    })
}

Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
}

let p = new Promise((resolve, rejected) => {
    setTimeout(() => {
        resolve(2);
        rejected(1);
    }, 1000);
})
p.then((res) => {
    console.log("res", res);
}).catch((err) => {
    console.log("catch", err);
});

