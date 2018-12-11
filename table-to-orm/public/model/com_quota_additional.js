module.exports = function(sequelize, DataTypes) {
    let com_quota_additional = sequelize.define('com_quota_additional', {
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        company_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            defaultValue: '',
            comment: '企业ID'
        },
        product_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '产品ID'
        },
        refuse_limit: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '',
            comment: '拒贷期限'
        }
    });
    return com_quota_additional;
}