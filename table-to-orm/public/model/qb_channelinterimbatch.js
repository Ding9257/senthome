module.exports = function(sequelize, DataTypes) {
    let qb_channelinterimbatch = sequelize.define('qb_channelinterimbatch', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        createtime: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: ''
        },
        amount: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        ordername: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: ''
        },
        orderno: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: ''
        },
        accountNo: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '付款账户号'
        },
        accountName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '付款账户名称'
        },
        customkey: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '发送方渠道key'
        },
        recCustomkey: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '接收方渠道key'
        },
        updatetime: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '操作时间（确认 or 驳回）'
        },
        providetime: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '设置佣金发放时间'
        },
        mfkjServiceFee: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        serviceFee: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '服务费'
        },
        payType: {
            type: DataTypes.INTEGER(2),
            allowNull: true,
            comment: '支付方式： 1 徽商银行  2 支付宝  3 微信'
        },
        status: {
            type: DataTypes.INTEGER(2),
            allowNull: true,
            comment: '0 待确认   1 执行成功  2 执行失败  3 已提交 4 已打款'
        },
        operatorName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '操作人'
        },
        remark: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: '备注信息'
        },
        originalBeachNo: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '商户订单号'
        },
        passNum: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            comment: ''
        },
        failedNum: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            comment: ''
        },
        batchNum: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            comment: ''
        },
        batchAmount: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        handleAmount: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        failedAmount: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        menuId: {
            type: DataTypes.INTEGER(10),
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
        fileName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        }
    });
    return qb_channelinterimbatch;
}