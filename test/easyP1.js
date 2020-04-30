function myPromise(fn) {

    let okCallBack = null;
    let errCallBack = null;

    let resolve = (res) => {
        console.log('resolve');
        setTimeout(() => {
            okCallBack(res);
        })
    }

    let reject = (err) => {
        errCallBack(err);
    }

    this.then = (f) => {
        console.log('then');
        okCallBack = f;
    }

    this.catch = (f) => {
        errCallBack = f;
    }

    fn(resolve, reject);

}

new myPromise(function (r) {
    setTimeout(() => {
        r(1);
    }, 1000)
}).then((res) => {
    console.log(res);
})


