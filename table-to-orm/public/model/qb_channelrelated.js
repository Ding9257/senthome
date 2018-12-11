module.exports = function(sequelize, DataTypes) {
    let qb_channelrelated = sequelize.define('qb_channelrelated', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        originalId: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '商户标识（原公司）'
        },
        companyId: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '关联的佣金待发商户（佣金代发公司）'
        },
        profiltUpper: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: ''
        },
        profiltLower: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: ''
        },
        merchantId: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '平台标识'
        },
        status: {
            type: DataTypes.INTEGER(2),
            allowNull: true,
            defaultValue: '0',
            comment: '关联状态：0 无效  1 目前 启用      2  历史'
        },
        createtime: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '创建时间'
        },
        updatetime: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '修改时间'
        },
        serviceRates: {
            type: DataTypes.STRING(25),
            allowNull: true,
            comment: '服务费'
        }
    });
    return qb_channelrelated;
}