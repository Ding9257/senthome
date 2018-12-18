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
    let res = "";
    if (value.includes('bigint(')) {
        res = value.replace(/bigint/, 'BIGINT');
    }
    if (value.includes('int(')) {
        res = value.replace(/int/, 'INTEGER');
    }
    if (value.includes('varchar(')) {
        res = value.replace(/varchar/, 'STRING');
    }
    if (value.includes('unsigned') && value.includes('int(')) {
        let index = value.indexOf(")");
        let tempRes = value.substr(0, index + 1);
        res = `${tempRes.replace(/int/, 'INTEGER')}.${"unsigned".toUpperCase()}`;
    }
    if (value.includes('tinyint(')) {
        res = value.replace(/tinyint/, 'TINYINT');
    }
    if (value.includes('datetime')) {
        res = "date".toUpperCase();
    }
    if (!res) {
        res = value.toUpperCase();
    }
    return res;
}

module.exports = writeFile;