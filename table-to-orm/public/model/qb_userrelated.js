module.exports = function(sequelize, DataTypes) {
    let qb_userrelated = sequelize.define('qb_userrelated', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            comment: ''
        },
        companyId: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '薪税下发公司标识'
        },
        originalId: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '商户标识（原公司）'
        },
        userNo: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '用户商户标识'
        },
        templateId: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '签约模板Id'
        },
        status: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            comment: '0 未签约 1 签约'
        },
        createTime: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        updateTime: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        agreementUrl: {
            type: DataTypes.STRING(1024),
            allowNull: true,
            comment: ''
        },
        contractId: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '上上签合同ID'
        }
    });
    return qb_userrelated;
}