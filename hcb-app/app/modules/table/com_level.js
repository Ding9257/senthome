module.exports = function(sequelize, DataTypes) {
    let com_level = sequelize.define('com_level', {
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
            comment: '企业ID'
        },
        cst_credit_level: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: '信用等级'
        },
        credit_evaluate_date: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '信用评定日期'
        },
        credit_level_out: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: '信用等级(外部)'
        },
        credit_evaluate_date_out: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '信用等级评定日期（外部）'
        },
        credit_evaluate_org_out: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '信用等级评定机构(外部)'
        }
    });
    return com_level;
}