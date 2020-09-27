function* say() {
    let a = yield 'hello swr1'
    console.log(a)
    let b = yield 'hello swr2'
    console.log(b)
}

let it = say() // 返回迭代器

// 打印输出 { value: 'hello swr1', done: false }
// 此时执行迭代器的第一个next，会把上图红色圈的区域执行，并且输出'hello swr1'
// 此时需要注意的是let a = yield 'hello swr1'，并非是把yield 'hello swr1'
// 赋值给a，那么a是什么时候被赋值呢？我们接着看下面
console.log(it.next())

// 打印输出 我是被传进来的1
//         { value: 'hello swr2', done: false }
// 此时我们在next里传参，实际上就是当执行第二个next的时候，
// 会把上面蓝色圈的区域执行，而这个next的参数，
// 会被赋值给a，然后执行console.log(a)，然后把'hello swr2'输出
console.log(it.next('我是被传进来的1'))

// 打印输出 我是被传进来的2
//         { value: undefined, done: true }
// 此时我们第三次执行next，实际上就是当执行了第三个next的时候，
// 会把上面黄色圈的区域执行，而这个next的参数，
// 会被赋值给b，然后执行console.log(b)，然后因为没有显式写return xxx，
// 会被默认返回undefined
console.log(it.next('我是被传进来的2'))
