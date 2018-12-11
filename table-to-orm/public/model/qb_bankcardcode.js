module.exports = function(sequelize, DataTypes) {
    let qb_bankcardcode = sequelize.define('qb_bankcardcode', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        bankName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: ''
        },
        bankCode: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: ''
        }
    });
    return qb_bankcardcode;
}