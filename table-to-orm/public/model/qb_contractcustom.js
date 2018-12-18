module.exports = function(sequelize, DataTypes) {
    let qb_contractcustom = sequelize.define('qb_contractcustom', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        contractId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '合同ID--对应contract 主键'
        },
        customkey: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '商户标识'
        },
        status: {
            type: DataTypes.INTEGER(255),
            allowNull: true,
            defaultValue: '1',
            comment: '1 启用  2 未启用 3 停用'
        }
    });
    return qb_contractcustom;
}