function run() {
    console.log(arguments);
    console.log(arguments[0]);
    console.log(Object.values(arguments));
}

run("士大夫", "二题", "发过火");
// run()