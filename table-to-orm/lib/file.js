/**
 * Created by lingxi on 2018/1/29.
 */
const fs = require('fs');
let lib = {
    writeFile: (filePath, str) => {
        fs.writeFile(filePath, str, err => {
            if (!err) console.log(`${filePath}完成`);
            else console.log(err);
        })
    },
    mkdir: (url) => {
        return new Promise((resolve, reject) => {
            fs.access(url, function (err) {
                if (!!err) {
                    //不存在
                    fs.mkdir(url, function (err) {
                        if (!err) resolve(err);
                        else reject(err);
                    });
                } else {
                    resolve();
                }
            })
        })
    }
};
module.exports = lib;