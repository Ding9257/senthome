function myPromise(fn) {

    let okCallBack = [];
    let errCallBack = null;
    let state = "padding";

    let resolve = (res) => {
        let ret = res;
        state = "fulfilled";
        setTimeout(() => {

            for (let i = 0; i < okCallBack.length; i++) {
                ret = okCallBack[i](ret);

                if (ret instanceof myPromise) {
                    okCallBack.slice(i + 1).forEach(cb => {
                        ret.then(cb);
                    });
                    ret.catch(errCallBack);
                    return;
                }
            }
        }, 1)
    }

    let reject = (err) => {
        state = "rejected";
        errCallBack(err);
    }

    this.then = (f) => {
        okCallBack.push(f);
        return this;
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


