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
        balance: {
            type: DataTypes.DECIMAL(50, 2),
            allowNull: false,
            comment: ''
        },
        payType: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
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
        },
        status: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '1',
            comment: '状态 1启用 2禁用'
        }
    });
    return channel_config;
}