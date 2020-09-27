function co(gen) {
    // {value,done:false}

    // 返回promise
    return new Promise((reslove, reject) => {

        onFulfilled();

        function onFulfilled(res) {
            let ret;

            try {
                ret = gen.next(res);
            } catch (e) {
                reject(e);
            }

            next(ret);
        }

        function onRejected(err) {
            let ret;

            try {
                ret = gen.thraw(err);
            } catch (e) {
                reject(e)
            }

            next(ret)
        }

        function next(ret) {
            if (ret.done) return reslove(ret.value);
            return value.then(onFulfilled, onRejected)
        }

    });
}