function promisify(original) {

    if (typeof original !== "function") {
        throw new Error('The "original" argument must be of type Function.');
    }


    return function () {
        return new Promise((resolve, reject) => {
            original.apply(this, Object.values(arguments).concat(
                (err, ...vals) => {
                    /*
                    console.log("val=" + val[1]);
                    let obj = {};
                    for (let i = 0; i < vals.length; i++) {
                        obj[key] = vals[i];
                    }
                    err ? reject(err) : resolve(obj)
                    */

                    err ? reject(err) : resolve(vals)
                }
            ));
        })
    }

}

function read(url, callback) {
    setTimeout(function () {
        callback(null, "啦啦啦", "玩儿");
    }, 1000)
}

// / read("", function (s) {
//     console.log(s);
// })

let readT = promisify(read);

readT("测试").then(function (r, r1) {
    console.log(r);
    console.log(r1);
})


