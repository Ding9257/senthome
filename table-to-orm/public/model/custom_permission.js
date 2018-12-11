module.exports = function(sequelize, DataTypes) {
    let custom_permission = sequelize.define('custom_permission', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        contentName: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: '权限名称'
        },
        contentLevel: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: '权限类型'
        },
        parentId: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: '父权限'
        },
        createTime: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '创建时间'
        },
        link: {
            type: DataTypes.STRING(128),
            allowNull: true,
            comment: '链接'
        },
        enabled: {
            type: DataTypes.TINYINT(4),
            allowNull: true,
            defaultValue: '1',
            comment: '是否启用'
        },
        remark: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: '备注'
        },
        showLevel: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '显示的顺序'
        },
        isShow: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '0: no, 1: show'
        }
    });
    return custom_permission;
}