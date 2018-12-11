module.exports = function(sequelize, DataTypes) {
    let hcb_car_detail = sequelize.define('hcb_car_detail', {
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        car_no: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            comment: '车牌号码'
        },
        owner: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '车辆所有人'
        },
        org_code: {
            type: DataTypes.STRING(18),
            allowNull: false,
            defaultValue: '',
            comment: '统一社会信用代码'
        },
        etc_no: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            comment: 'ETC卡号'
        },
        linked: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: '0',
            comment: '是否挂靠1是 0不是'
        },
        loan: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: '0',
            comment: '是否贷款靠1是 0不是'
        },
        insured: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: '0',
            comment: '是否缴纳商业险靠1是 0不是'
        },
        insured_amt: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: '0.00',
            comment: '商业险保额'
        }
    });
    return hcb_car_detail;
}