module.exports = function(sequelize, DataTypes) {
    let qb_extrorderinfo = sequelize.define('qb_extrorderinfo', {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键'
        },
        userId: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            comment: '用户id'
        },
        extrOrderId: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '合同订单号'
        },
        status: {
            type: DataTypes.INTEGER(1).UNSIGNED,
            allowNull: false,
            defaultValue: '0',
            comment: '状态1，已签  0，未签 ，-1待签约'
        },
        creatTime: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '创建时间'
        },
        url: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '通知地址'
        },
        customkey: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '渠道key'
        }
    });
    return qb_extrorderinfo;
}