module.exports = function(sequelize, DataTypes) {
    let custom_permission_relation = sequelize.define('custom_permission_relation', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        custom_id: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: '渠道商id'
        },
        permission_id: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: '权限id'
        }
    });
    return custom_permission_relation;
}