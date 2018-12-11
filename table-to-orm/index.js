const path = require('path');
const DB = require('./DB/query');
const writeFile = require('./lib/writeFile');
const views = require('./lib/views');
const file = require('./lib/file');

async function start() {
    let arrTable = await DB.getTables();
    arrTable.forEach(async (tableName) => {
        let list = await DB.getCOLUMNS(tableName);
        //生成model
        writeFile(path.join(__dirname, 'public', 'model', `${tableName}.js`), tableName, list);
        //生成views
        return true;
        let arrField = [];
        list.forEach((item, index) => {
            if (item.Field != 'id') {
                arrField.push({
                    title: item.Comment || `字段${index + 1}`,
                    name: item.Field
                })
            }
        })
        if (!!arrField.length) {
            let filePath = path.join(__dirname, 'public', 'views', tableName);
            await file.mkdir(filePath);
            views.main(arrField, path.join(filePath, 'add.ejs'), 'add');
            views.main(arrField, path.join(filePath, 'edit.ejs'), 'edit');
            views.main(arrField, path.join(filePath, 'info.ejs'), 'info');
            views.list(arrField, path.join(filePath, 'list.ejs'));
        }
    });
}
start();
