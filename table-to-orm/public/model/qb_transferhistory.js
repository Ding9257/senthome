module.exports = function(sequelize, DataTypes) {
    let qb_transferhistory = sequelize.define('qb_transferhistory', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键'
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '用户id'
        },
        transferRequestNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '交易订单号'
        },
        amount: {
            type: DataTypes.STRING(15),
            allowNull: true,
            comment: '交易金额'
        },
        tradeType: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '交易类型（参照类型表）'
        },
        creatTime: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '创建时间'
        },
        creatMonth: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '创建日期'
        },
        tradeCharge: {
            type: DataTypes.DECIMAL(10, 0),
            allowNull: true,
            comment: '手续费  元'
        },
        tradeChargeRate: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            comment: '手续费  %'
        },
        status: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '交易状态  1成功，0失败  2待确认  3,批量资金发放，待输入密码'
        },
        statusDesc: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        operateCount: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '操作次数'
        },
        operateBankCardId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '操作对应的transferBank的银行卡号'
        },
        targetUserId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '目标用户id'
        },
        customBackUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '渠道回调url'
        },
        customOrderNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '渠道订单号'
        },
        batchNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '批量资金发放批次号'
        },
        merchantId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '渠道唯一标识'
        },
        historyDesc: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '订单备注'
        },
        customBatchNo: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '渠道批量资金发放批次号'
        },
        batchOutCallBackUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '渠道批量资金发放回调地址'
        }
    });
    return qb_transferhistory;
}