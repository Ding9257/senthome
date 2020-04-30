// callback
// promise
// yield 协程
// Generator

function* r1() {
    let v = yield 1 + 1;
    return v;
}



function run(fn) {
    let gen = fn();
    console.log(gen);

    function next(err, data) {
        let result = gen.next(data);
        console.log(result);
        if(result.done) return;
        result.value(next);

    }

    next();

}

console.log(run(r1));