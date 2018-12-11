module.exports = function(sequelize, DataTypes) {
    let qb_channel = sequelize.define('qb_channel', {
        id: {
            type: DataTypes.INTEGER(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        originalId: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '商户标识'
        },
        merchantId: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '平台ID'
        },
        originalName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '商户名称'
        },
        appSecret: {
            type: DataTypes.STRING(60),
            allowNull: true,
            comment: ''
        },
        phoneNo: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        createTime: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        updateTime: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        }
    });
    return qb_channel;
}