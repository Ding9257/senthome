module.exports = function(sequelize, DataTypes) {
    let qb_bankname = sequelize.define('qb_bankname', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        mark: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: ''
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: ''
        },
        superNetNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        bankCompanyName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        }
    });
    return qb_bankname;
}