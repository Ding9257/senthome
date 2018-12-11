/**
 * Created by lingxi on 2017/12/20.
 */
const fs = require('fs');
const beautify_js = require('js-beautify').js;
const sequelize = 'sequelize';
const DataTypes = 'DataTypes';
function writeFile(filePath, tableName, list) {
    let str =
        `module.exports = function (${sequelize}, ${DataTypes}) {
            let ${tableName} = ${sequelize}.define('${tableName}',{
            ${handleList(list)}
            });
            return ${tableName};
            }`;
    str = beautify_js(str);
    fs.writeFile(filePath, str, err => {
        if (!err) console.log(`${tableName}完成`);
        else console.log(err);
    })
}
function handleList(list) {
    return list.map(item => {
        return `${item.Field}:{${handleitem(item)}}`;
    }).join(',\n')

}
function handleitem(item) {
    let str = '';
    Object.keys(item).forEach(key => {
        str = str + handleKey(key, item[key]);
    });

    if (str.endsWith(',')) {
        return str.substring(0, str.length - 1);
    }
    return str;
}
function handleKey(key, value) {
    let str = ''
    switch (key) {
        case 'Type':
            str = `type: ${DataTypes}.${handleType(value)},`;
            break;
        case 'Null':
            if (value == 'NO') {
                str = `allowNull: false,`
            } else {
                str = `allowNull: true,`
            }
            break;
        case 'Key':
            if (value == 'PRI') {
                str = `primaryKey: true,`
            } else if (value == 'UNI') {
                str = 'unique: true,'
            }
            break;
        case 'Default':
            if (value !== null) {
                str = `defaultValue: '${value}',`
            }
            break;
        case 'Extra':
            if (value == 'auto_increment') {
                str = `autoIncrement: true,`
            }
            break;
        case 'Comment':
            str = `comment: '${value}',`;
            break;
    }
    return str;
}
function handleType(value) {
    return value.includes('bigint(') ? value.replace(/bigint/, 'BIGINT') :
        value.includes('int(') ? value.replace(/int/, 'INTEGER') :
            value.includes('varchar(') ? value.replace(/varchar/, 'STRING') : value.toUpperCase();
}
module.exports = writeFile;