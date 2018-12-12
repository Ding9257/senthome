const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    let t_batch = sequelize.define('t_batch', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        batchId: {type: DataTypes.STRING(127), allowNull: true, comment: '批次编号'},
        listing_no: {type: DataTypes.STRING(64), allowNull: true, comment: '挂牌编号'},
        listing_name: {type: DataTypes.STRING(255), allowNull: true, comment: '挂牌名称'},
        amount: {type: DataTypes.STRING(127), allowNull: true, comment: '核准金额'},
        startDate: {
            type: DataTypes.STRING, allowNull: true, comment: '开始日期'
        },
        endDate: {
            type: DataTypes.STRING, allowNull: true, comment: '结束日期'
        },
        Period: {type: DataTypes.STRING, allowNull: true, comment: '融资期限'},
        rate: {type: DataTypes.STRING, allowNull: true, comment: '融资利率'},
        states: {type: DataTypes.ENUM('SUCCESS', 'FAILED', 'WAITING'), allowNull: true, comment: '推送状态'},
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });
    return t_batch;
}