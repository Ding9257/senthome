module.exports = function(sequelize, DataTypes) {
    let qb_channelhistory = sequelize.define('qb_channelhistory', {
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
            defaultValue: '0.00',
            comment: '成功交易金额'
        },
        ordername: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '订单名称'
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
        transfertype: {
            type: DataTypes.INTEGER(2),
            allowNull: true,
            comment: '交易类型  1  充值    2 发佣金'
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
            comment: '支付方式： 1银行  2 支付宝  3 微信'
        },
        status: {
            type: DataTypes.INTEGER(2),
            allowNull: true,
            comment: '0 待确认   1 执行成功  2 执行失败  3 已提交 4 驳回'
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
            defaultValue: '0',
            comment: '成功交易笔数'
        },
        failedNum: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            defaultValue: '0',
            comment: '失败交易笔数'
        },
        noSignNum: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            defaultValue: '0',
            comment: '未签约订单数目'
        },
        batchNum: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            defaultValue: '0',
            comment: '批次总笔数'
        },
        batchAmount: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '0.00',
            comment: '批次总金额'
        },
        handleAmount: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '0.00',
            comment: '应付总金额'
        },
        noSignAmount: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '0.00',
            comment: '未签约订单金额'
        },
        failedAmount: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '0.00',
            comment: '失败交易金额'
        },
        menuId: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            comment: '菜单ID'
        },
        batchName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '批次名称		'
        },
        batchDesc: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '批次描述'
        },
        fileName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '文件名称'
        }
    });
    return qb_channelhistory;
}