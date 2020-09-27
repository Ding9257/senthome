const ExcelService = require('./ExcelService');
const _ = require('lodash');
const fs = require('fs');

async function start() {

    let pwd = "/Users/lingxi/Downloads/验收单+(2)_20200926093701355.xlsx";

    let excel = new ExcelService(pwd);
    await excel.init();

    let readLine = 1;

    let excelData = excel.getSheet(0, readLine);

    let list = [];


    console.log(list);
}

start();

