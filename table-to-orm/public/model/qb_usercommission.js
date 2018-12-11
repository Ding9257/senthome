module.exports = function(sequelize, DataTypes) {
    let qb_usercommission = sequelize.define('qb_usercommission', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        createtime: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        userId: {
            type: DataTypes.STRING(11),
            allowNull: true,
            comment: ''
        },
        amount: {
            type: DataTypes.STRING(20),
            allowNull: true,
            defaultValue: '0',
            comment: ''
        },
        originalId: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '商户标识'
        },
        merchantId: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '平台标识'
        },
        companyId: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        userType: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: '1',
            comment: '用户类型 1：普通自由职业者 2：企业合伙人'
        },
        statusDesc: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        status: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: '0',
            comment: ' 0 待发放 1  发放成功  2 发放失败'
        },
        batchId: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '批次id 对应交易记录表id'
        },
        aygOrderNo: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '爱员工授权订单号'
        },
        orderNo: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: ''
        },
        updatetime: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '佣金发放时间'
        },
        operatorName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '操作人'
        },
        remark: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '备注'
        },
        serviceRatesFree: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        profiltFree: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        serviceRates: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        profilt: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        payType: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: '1',
            comment: '支付方式'
        },
        account: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '支付宝账户'
        },
        invoiceStatus: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            comment: '1 已开票  2 未开票  '
        },
        invoiceBatchNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '发票号'
        },
        menuId: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            comment: ''
        },
        contentName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        paymentTime: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        userNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        companyName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        certId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        documentType: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            comment: ''
        },
        userName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        customName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        batchFileName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        bankName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        batchName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        batchDesc: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        bankNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        }
    });
    return qb_usercommission;
}