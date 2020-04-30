function co1(gen) {

    // 判断gen类型

    // 返回Promise
    return new Promise(function (resolve, reject) {

        onFulfilled();

        // 定义成功方法 resolve
        function onFulfilled(res) {
            let ret;
            try {
                ret = gen.next(res);
            } catch (e) {
                reject(e);
            }
            next(ret);
        }

        // 定义失败方法 reject
        function onRejected(err) {
            let ret;
            try {
                ret = gen.throw(err);
            } catch (e) {
                reject(e);
            }
            next(ret);
        }

        function next(ret) {
            // gen是否结束
            if (ret.done) return resolve(ret.value);
            var value = toPromise.call(ctx, ret.value);
            if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
            return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
                + 'but the following object was passed: "' + String(ret.value) + '"'));
            return value.then(onFulfilled, onRejected);

        }

    })


}