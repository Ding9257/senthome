module.exports = function(sequelize, DataTypes) {
    let qb_transfertype = sequelize.define('qb_transfertype', {
        tradeType: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '1。报销，2提现，'
        },
        tradeName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        type: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '1.收入，2，支出 ，0，全部'
        }
    });
    return qb_transfertype;
}