const ExcelService = require('./ExcelService');
const _ = require('lodash');
const fs = require('fs');

async function start() {

    let pwd = "/Users/lingxi/Documents/vip/vip/执行结果1 (7).xlsx";

    let excel = new ExcelService(pwd);
    await excel.init();

    let customKey = '041a4c132c414bf8b1f3cc0f79fa112f';
    let companyId = '3af3df08e040461b81105d60789b6337';

    let readLine = 2;

    let excelData = excel.getSheet(0, readLine);

    let list = [];

    for (let arr of excelData) {

        let certId = arr[1];
        let url = arr[2];

        let sql = `update cs_project_member set signUrl = '${url}' where certId = '${certId}' and customKey = '${customKey}' and companyId = '${companyId}';\n`;

        let sql1 = `update cs_member_task set signUrl = '${url}' where certId = '${certId}' and customKey = '${customKey}' and companyId = '${companyId}';\n`;

        fs.appendFile("./test.sql", sql + sql1, () => {
        });

        list.push(sql);
        list.push(sql1);

    }

    console.log(list);
}

start();

