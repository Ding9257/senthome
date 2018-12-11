const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
fs.readdirAsync('./public/model').then(data => {
    console.log(data);
});