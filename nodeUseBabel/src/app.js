class Math {

    @log
    add(a, b) {
        return a + b;
    }
}

function log(target, name, descriptor) {

    var oldValue = descriptor.value;

    descriptor.value = function () {
        console.log(`Calling ${name} with`, ...arguments);
        return oldValue.apply(this, arguments);
    };

    return descriptor;
}


let math = new Math()
math.add(1, 2)