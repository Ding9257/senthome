module.exports = function(sequelize, DataTypes) {
    let qb_usercommission = sequelize.define('qb_usercommission', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        batchId: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '批次id 对应交易记录表id'
        },
        orderNo: {
            type: DataTypes.STRING(50),
            allowNull: true,
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
            comment: '用户ID'
        },
        amount: {
            type: DataTypes.STRING(20),
            allowNull: true,
            defaultValue: '0',
            comment: '下发金额'
        },
        serviceType: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '服务类型'
        },
        price: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '单价'
        },
        number: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '计件'
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
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '结算公司ID'
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
            comment: '状态描述'
        },
        status: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: '0',
            comment: ' 0 待发放 1  发放成功  2 发放失败'
        },
        aygOrderNo: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '爱员工授权订单号'
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
            comment: '服务费'
        },
        profiltFree: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '利润'
        },
        serviceRates: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '服务费费率'
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
            comment: '打款账户'
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
            comment: '菜单ID'
        },
        contentName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '菜单名称'
        },
        paymentTime: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '到账时间'
        },
        userNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        companyName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '下发公司名称'
        },
        certId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '证件号码'
        },
        documentType: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            comment: '证件类型'
        },
        userName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '姓名'
        },
        customName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '商户名称'
        },
        batchFileName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '批次文件名称'
        },
        bankName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '支行信息'
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        batchName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '批次名称'
        },
        batchDesc: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '批次描述'
        },
        bankNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        }
    });
    return qb_usercommission;
}