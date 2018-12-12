/**
 * Created by lingxi on 2018/1/4.
 */
const config = require('./../../config');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const options = {
    host: config.DB.host,
    dialect: "mysql",
    timezone: "+08:00",
    dialectOptions: {
        charset: "utf8",
        collate: "utf8_general_ci",
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    port: config.DB.port,
    define: {
        freezeTableName: true,
        syncOnAssociation: true,
        timestamps: false,
        underscored: true
    },
};


const client = new Sequelize(config.DB.database, config.DB.username, config.DB.password, options);


let models = {};

fs.readdirSync(__dirname + '/table')
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function (file) {
        var model = client.import(path.join(__dirname + '/table', file));
        models[model.name] = model;
    });

Object.keys(models).forEach(function (modelName) {
    if (models[modelName].options.hasOwnProperty('associate')) {
        models[modelName].options.associate(models);
    }
});

module.exports = models;
module.exports.client = client;