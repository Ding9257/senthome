module.exports = function (sequelize, DataTypes) {
    let t_order = sequelize.define('t_order', {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            comment: '主键',
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        batchId: {type: DataTypes.STRING(127), allowNull: true, comment: '批次号'},
        orderNo: {type: DataTypes.STRING(127), allowNull: false, unique: true, comment: '订单编号'},
        supplierId: {type: DataTypes.STRING(127), allowNull: true, comment: '供应商ID'},
        supplierCompanyName: {type: DataTypes.STRING(255), allowNull: true, comment: '供应商公司名'},
        tradingCompanyId: {type: DataTypes.STRING(255), allowNull: true, comment: '采购公司ID'},
        orderCreateTime: {type: DataTypes.STRING(255), allowNull: true, comment: '下单时间'},
        orderType: {type: DataTypes.STRING(10), allowNull: true, comment: '订单类型'},
        receivable: {type: DataTypes.STRING(20), allowNull: true, comment: '应收金额'},
        orderStatus: {type: DataTypes.STRING(10), allowNull: true, comment: '订单状态'},
        transStatus: {type: DataTypes.STRING(10), allowNull: true, comment: '物流状态'},
        deliveryType: {type: DataTypes.STRING(10), allowNull: true, comment: '送货方式'},
        isLoan: {type: DataTypes.STRING(10), allowNull: true, comment: '是否使用快塑贷'},
        loanType: {type: DataTypes.STRING(10), allowNull: true, comment: '快塑贷类型'},
        file: {type: DataTypes.STRING(255), allowNull: true, comment: '采购合同路径'},
        filename: {type: DataTypes.STRING(255), allowNull: true, comment: '文件名'},
        states: {type: DataTypes.ENUM, values: ['1', '2', '3', '4'], defaultValue: '4'}, // 通过1,退回2,拒绝3,4待审核
        audit_code: {type: DataTypes.ENUM, values: ['0', '1', '2', '3'], defaultValue: '0'}, // 交易所审核状态 0:待审核 1:不通过 2:通过 3: 已到期
        isUpload: {type: DataTypes.INTEGER(10),allowNull: true, comment: '是否上传附件 0上传 1以上传', defaultValue: 0},
        createdTime: {type: DataTypes.STRING(15), allowNull: true, comment: '', defaultValue: sequelize.NOW}
    }, {
        hooks: {
            beforeCreate(data, option) {
                if (!data.createdTime) data.createdTime = Date.now();
            }
        },
        associate: function (models) {
            t_order.hasMany(models.t_subject, {
                as: 'subject',
                foreignKey: 'orderId',
                targetKey: 'orderNo'
            });
            t_order.belongsTo(models.t_batch, {
                as: 'batch',
                foreignKey: 'batchId',
                targetKey: 'batchId'
            })
        }
    });
    return t_order;
}