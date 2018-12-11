module.exports = function(sequelize, DataTypes) {
    let t_project = sequelize.define('t_project', {
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '编号'
        },
        project_no: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '项目编号'
        },
        project_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '项目名称'
        },
        project_status: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '项目状态'
        },
        project_line_time: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '项目上线时间'
        },
        project_down_time: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '项目终止时间'
        },
        partner_no: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        createUser: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '项目创建人'
        },
        createTime: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '项目创建时间'
        },
        is_credit: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '是否已授信'
        }
    });
    return t_project;
}