const client = require('./../app/modules').client;

async function start() {
    console.log('清除数据');
    let arrTable = await getTables();
    let arr = arrTable.map((tableName) => {
        return clearData(tableName)
    });
    await Promise.all(arr);
    process.exit(1);
}

function getTables() {
    return client.query("show tables", {type: client.QueryTypes.SELECT}).then(function (list) {
        return list.map(value => {
            return Object.values(value)[0]
        });
    })
}

function clearData(tableName) {
    return client.query(`delete from ${tableName}`, {type: client.QueryTypes.DELETE})
}

start();