/**
 * Created by lingxi on 2017/12/20.
 */
const sequelize = require('./index').client;
module.exports = {
    getTables:()=>{
        return sequelize.query("show tables", {type: sequelize.QueryTypes.SELECT}).then(function (list) {
            return list.map(value => {
                return Object.values(value)[0]
            });
        })
    },
    getCOLUMNS:(tableName)=>{
        return sequelize.query(`SHOW FULL COLUMNS FROM ${tableName}`,{type: sequelize.QueryTypes.SELECT});
    }
}