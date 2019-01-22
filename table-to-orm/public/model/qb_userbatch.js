module.exports = function(sequelize, DataTypes) {
    let qb_userbatch = sequelize.define('qb_userbatch', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        createTime: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: ''
        },
        batchId: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: ''
        },
        passNum: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            comment: '校验成功数目'
        },
        batchNum: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            comment: '批次数目'
        },
        errorNum: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            comment: '校验失败数目'
        },
        customkey: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '商户标识'
        },
        companyId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'j结算公司标识'
        },
        status: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            comment: '1 未提交  2 已提交'
        }
    });
    return qb_userbatch;
}