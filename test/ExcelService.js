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
                    r.push(cell.text);
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