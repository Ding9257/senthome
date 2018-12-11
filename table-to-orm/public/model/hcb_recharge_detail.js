module.exports = function(sequelize, DataTypes) {
    let hcb_recharge_detail = sequelize.define('hcb_recharge_detail', {
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        company_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '公司ID'
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
            allowNull: false,
            comment: '充值流水ID'
        },
        loan_time: {
            type: DataTypes.STRING(40),
            allowNull: false,
            comment: '借款时间'
        },
        laon_amt: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            comment: '借款金额'
        }
    });
    return hcb_recharge_detail;
}