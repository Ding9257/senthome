module.exports = function(sequelize, DataTypes) {
    let custom_menu = sequelize.define('custom_menu', {
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
        originalId: {
            type: DataTypes.STRING(128),
            allowNull: true,
            comment: '商户ID'
        },
        enabled: {
            type: DataTypes.TINYINT(4),
            allowNull: true,
            defaultValue: '1',
            comment: '是否启用 1启用 -1禁用'
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
            defaultValue: '1',
            comment: '0: no, 1: show'
        },
        updateTime: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '最后更新时间'
        },
        levelCode: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '项目层级编码'
        },
        isParentNode: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: '-1',
            comment: '-1 不是父节点 1 是父节点'
        }
    });
    return custom_menu;
}