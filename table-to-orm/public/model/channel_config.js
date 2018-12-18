module.exports = function(sequelize, DataTypes) {
    let channel_config = sequelize.define('channel_config', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        channelId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: ''
        },
        payType: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            comment: '下发通道 1银行卡 2微信 3支付宝'
        },
        accountName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '账户名称'
        },
        accountNum: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '账户号'
        },
        bankName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '开户行'
        },
        usefor: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '用途'
        },
        customkey: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '渠道商唯一标识'
        }
    });
    return channel_config;
}