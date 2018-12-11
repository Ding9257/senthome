module.exports = function(sequelize, DataTypes) {
    let qb_transferbank = sequelize.define('qb_transferbank', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键'
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '用户id'
        },
        bankCardNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '开户银行卡（提现用）'
        },
        status: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '绑定状态0--解绑，  1--绑定  -1待激活'
        },
        bankNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '银行编号'
        },
        transferType: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '类型  1.充值  2，提现 3.企业对公帐号'
        },
        bankCardPhoneNo: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '银行预留手机号'
        },
        creat_time: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '创建时间'
        }
    });
    return qb_transferbank;
}