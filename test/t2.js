setTimeout(async function () {

    let i = 0;

    while (true) {

        console.log(++i);

        await sleep();

    }
}, 1000);


function sleep() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, 1000);
    })
}