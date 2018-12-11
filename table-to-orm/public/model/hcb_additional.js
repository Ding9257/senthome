module.exports = function(sequelize, DataTypes) {
    let hcb_additional = sequelize.define('hcb_additional', {
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
            unique: true,
            comment: '企业ID'
        },
        work_years: {
            type: DataTypes.INTEGER(3),
            allowNull: true,
            comment: '运输行业连续经营年限'
        },
        worker_num: {
            type: DataTypes.INTEGER(3),
            allowNull: true,
            comment: '在职员工人数（不含挂靠）'
        },
        driver_num: {
            type: DataTypes.INTEGER(3),
            allowNull: true,
            comment: '全职司机人数（不含挂靠）'
        },
        drive_avg_years: {
            type: DataTypes.DECIMAL(4, 1),
            allowNull: true,
            comment: '货运司机平均驾龄（年）'
        },
        co_years: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: '货车帮合作起始时间 精确到日'
        }
    });
    return hcb_additional;
}