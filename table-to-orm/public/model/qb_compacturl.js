module.exports = function(sequelize, DataTypes) {
    let qb_compacturl = sequelize.define('qb_compacturl', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            comment: ''
        },
        customkey: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '渠道key'
        },
        compactNotifyUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '合同通知地址'
        }
    });
    return qb_compacturl;
}