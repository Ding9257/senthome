module.exports = function(sequelize, DataTypes) {
    let hcb_com_car = sequelize.define('hcb_com_car', {
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
            comment: '客户号码'
        },
        org_code: {
            type: DataTypes.STRING(18),
            allowNull: false,
            unique: true,
            defaultValue: '',
            comment: '统一社会信用代码'
        },
        car_brand: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '牵引车品牌  进口 合资 国产'
        },
        has_storage: {
            type: DataTypes.STRING(4),
            allowNull: true,
            comment: '有无仓储分拨中心  0 无  1 有'
        },
        has_park: {
            type: DataTypes.STRING(4),
            allowNull: true,
            comment: '有无固定停车场 0 无 1 有'
        },
        total_car_quantity: {
            type: DataTypes.INTEGER(6),
            allowNull: true,
            comment: '总车辆数量 公司实际可用货运车辆总数'
        },
        own_car_quantity: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            comment: '自有车辆数量 自有货运车辆'
        },
        other_car_quantity: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            comment: '挂靠车辆数量'
        },
        loan_car_quantity: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            comment: '有贷款的车辆数量 自有货运车辆中，目前有贷款的数量'
        },
        avg_m_etc_amt: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            comment: '月均通行费用（全部车辆）(万元)'
        },
        avg_m_oil_amt: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            comment: '月均加油费用（全部车辆）(万元)'
        },
        main_ops: {
            type: DataTypes.STRING(4),
            allowNull: true,
            comment: '是否核心承运商 0 是 1 否'
        }
    });
    return hcb_com_car;
}