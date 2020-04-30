function promise(fn) {

    let okCallBack, errCallBack;

    function resolve(res) {
        setTimeout(() => {
            okCallBack(res)
        }, 1);
    }

    function rejected(err) {
        setTimeout(() => {
            errCallBack(err);
        }, 1)
    }

    this.then = (f) => {
        console.log('then');
        okCallBack = f;
        return this;
    }

    this.catch = (f) => {
        console.log('catch');
        errCallBack = f;
    }

    fn(resolve, rejected);
}

/**
 * promise接收一个函数fn
 * fn函数里有两个参数都是方法 resolve,rejected
 * then接受一个函数（注册回调函数）
 * fn可能是同步方法，将resolve,rejected注册成异步
 *
 */

new promise(function (resolve, rejected) {
    return rejected("测试");
}).then(function (res) {
    console.log(res);
}).then().catch(function (err) {
    console.log("err", err);
})