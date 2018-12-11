module.exports = function(sequelize, DataTypes) {
    let qb_bankcard = sequelize.define('qb_bankcard', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键'
        },
        bankName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '银行名'
        },
        bankFullName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '银行卡名'
        },
        length: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '银行卡长度'
        },
        cardFullNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '银行卡号'
        },
        startLength: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '银行卡起始长度'
        },
        start: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true,
            comment: '银行卡起始'
        },
        bankNo: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            comment: '银行编号'
        }
    });
    return qb_bankcard;
}