const Excel = require('exceljs');

class ExcelService {
    constructor(file) {
        this.file = file;
        this.workbook = null;
        this.sheets = null;
        this.sheetCount = 0;
    }

    async init() {
        const workbook = new Excel.Workbook();
        this.workbook = await workbook.xlsx.readFile(this.file);
        this.sheets = this.workbook.worksheets;
        this.sheetCount = this.workbook.worksheets.length;
    }

    getSheet(i, readLine) {
        // 判断 i是否越界 this.sheetCount
        let sheet = this.sheets[i];
        return this.readSheet(sheet, readLine);
    }

    getSheetByName(name) {
        // 遍历sheet 比对名字
        return null;
    }

    readSheet(sheet, readLine = 0) {
        let list = [];

        sheet.eachRow((row, rowNumber) => {
            if (rowNumber >= readLine) {
                let r = [];
                row.eachCell({includeEmpty: true}, function (cell, colNumber) {
                    let text = '';

                    if (type(cell.value) === 'string') text = cell.value;
                    if (type(cell.value) === 'object') text = cell.value.text;

                    r.push(text);
                });
                list.push(r);
            }
        });

        return list;
    }
}

module.exports = ExcelService;

// let excelService = new ExcelService("/Users/lingxi/Documents/1591081313176.xlsx");
// await excelService.init("/Users/lingxi/Documents/1591081313176.xlsx");
// excelService.getSheet(0,1);

let class2type = {};
'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function (e, i) {
    class2type['[object ' + e + ']'] = e.toLowerCase();
});

function type(obj) {
    if (obj == null) {
        return String(obj);
    }
    return typeof obj === 'object' || typeof obj === 'function' ?
        class2type[Object.prototype.toString.call(obj)] || 'object' :
        typeof obj;
};