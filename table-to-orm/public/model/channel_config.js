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
            allowNull: false,
            comment: ''
        },
        payType: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            comment: ''
        },
        accountName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        accountNum: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        bankName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        usefor: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        }
    });
    return channel_config;
}