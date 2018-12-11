/**
 * Created by lingxi on 2017/12/20.
 */
const DB = require('./setting');
const Sequelize = require('sequelize');
const options = {
    host: DB.host,
    dialect: "mysql",
    timezone: "+08:00",
    dialectOptions: {
        charset: "utf8",
        collate: "utf8_general_ci",
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    port: DB.port,
    define: {
        freezeTableName: true,
        syncOnAssociation: true,
        timestamps: false,
        underscored: true
    },
};

const client = new Sequelize(DB.database, DB.username, DB.password, options);

module.exports.client = client;