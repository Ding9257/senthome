module.exports = function(sequelize, DataTypes) {
    let hcb_loan_apply = sequelize.define('hcb_loan_apply', {
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        company_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '企业ID'
        },
        loan_amt: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            comment: '贷款金额'
        },
        etc_no: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: 'ETC卡号'
        },
        car_no: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '车辆牌号'
        },
        recharge_id: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: '',
            comment: '充值流水ID'
        },
        bid_num: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: '',
            comment: '借款编号'
        }
    });
    return hcb_loan_apply;
}