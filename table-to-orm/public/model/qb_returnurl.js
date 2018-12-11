module.exports = function(sequelize, DataTypes) {
    let qb_returnurl = sequelize.define('qb_returnurl', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        user_id: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '用户id'
        },
        passwordSetReturnUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '设置密码后台通知'
        },
        passwordResetUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '重置密码后台通知'
        },
        passwordChangeUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '修改密码后台通知'
        }
    });
    return qb_returnurl;
}