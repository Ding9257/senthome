const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    let t_subject = sequelize.define('t_subject', {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '主键',
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        orderId: {
            type: DataTypes.STRING(127), allowNull: false, comment: '订单编号',
            references: {model: 't_order', key: 'orderNo'}
        },
        creditor: {type: DataTypes.STRING(127), allowNull: true, comment: '债权人'},
        debtor: {type: DataTypes.STRING(127), allowNull: true, comment: '债务人'},
        amout: {type: DataTypes.FLOAT, allowNull: true, comment: '借款金额'},
        air: {type: DataTypes.FLOAT, allowNull: true, comment: '借款年利率' % ''},
        startDate: {type: DataTypes.STRING(255), allowNull: true, comment: '借款起始日'},
        expiryDate: {type: DataTypes.STRING(255), allowNull: true, comment: '借款到期日'},
        use: {type: DataTypes.STRING(15), allowNull: true, comment: '借款用途'},
        guaranteeWay: {type: DataTypes.STRING(15), allowNull: true, comment: '担保方式'},
        guarantor: {type: DataTypes.STRING(127), allowNull: true, comment: '担保方/品'},
        guarantorId: {type: DataTypes.STRING(127), allowNull: true, comment: '担保方/品编号'},
        createdTime: {type: DataTypes.STRING(15), allowNull: true, comment: '', defaultValue: sequelize.NOW}
    }, {
        hooks: {
            beforeCreate(data, option) {
                if (!data.createdTime) data.createdTime = Date.now();
            }
        },
        associate: function (models) {

            t_subject.belongsTo(models.t_order, {
                as: 'order',
                foreignKey: 'orderId',
                targetKey: 'orderNo'
            });
        }

    });
    return t_subject;
}