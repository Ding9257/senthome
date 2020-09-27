const ExcelService = require('./ExcelService');
const _ = require('lodash');
const fs = require('fs');

async function start() {

    let pwd = "/Users/lingxi/Documents/vip/vip/执行结果1 (21).xlsx";

    let excel = new ExcelService(pwd);
    await excel.init();

    let customKey = '25d55d0387284e3ab7694493b36c3249';
    let companyId = '30933bc61b974a8abbb7ad3bfe0dc233';

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

