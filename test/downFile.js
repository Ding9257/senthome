const request = require('request');
const fs = require('fs');
const path = require('path');

console.log(__dirname);

const ExcelService = require('./ExcelService');

function downloadFile(uri, filename, callback) {

    let filePath = path.join(__dirname, "./file/" + filename);

    const stream = fs.createWriteStream(filePath, "utf8");
    try {
        request(uri).pipe(stream).on('close', callback);
    } catch (e) {
        console.log(e);
    }
}

async function run() {

    const excelService = new ExcelService("/Users/lingxi/Documents/downFile/身份证06091.xlsx");
    await excelService.init();
    let list = excelService.getSheet(0, 2);

    for (let item of list) {
        let name = item[2];

        let userCertFrontPicture = item[7];

        let userCertBackPicture = item[9];

        await downloadFile(userCertFrontPicture, `${name}_正.jpg`, function () {
            console.log(name + '正下载完毕');
        })

        await downloadFile(userCertBackPicture, `${name}_反.jpg`, function () {
            console.log(name + '反下载完毕');
        })
    }
}

run()

// async function runSign() {
//     const excelService = new ExcelService("/Users/lingxi/Documents/downFile/协议0609.xlsx");
//     await excelService.init();
//     let list = excelService.getSheet(0, 1);
//
//     for (let item of list) {
//         await downloadFile(item[1], `${item[0]}.pdf`, function () {
//             console.log('下载完毕');
//         })
//     }
// }
//
// runSign();
