module.exports = function(sequelize, DataTypes) {
    let com_fin = sequelize.define('com_fin', {
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
        opt_status: {
            type: DataTypes.STRING(16),
            allowNull: true,
            comment: '经营状况'
        },
        financial_contact: {
            type: DataTypes.STRING(12),
            allowNull: true,
            comment: '财务部联系方式'
        },
        acct_bank: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '企业开户行'
        },
        bank_card_num: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '企业银行卡号'
        },
        acct_open_date: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '开户日期'
        },
        money_source: {
            type: DataTypes.STRING(10),
            allowNull: true,
            comment: '经营资金来源1自有 2贷款'
        },
        loan_amt: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            comment: '经营贷款金额 （万元）当经营资金来源为贷款需填写'
        },
        credit_level: {
            type: DataTypes.STRING(10),
            allowNull: true,
            comment: '企业征信等级 1 正常类 2 瑕疵类 3 次级类 4禁入类'
        },
        receivable_m_avg_amt: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            comment: '月均应收账款（万元）'
        },
        receivable_ap: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            comment: '应收账款账期（天）'
        },
        handle_m_avg_amt: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            comment: '月均应付账款（万元）'
        },
        handle_ap: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            comment: '应付账款账期（天）'
        },
        fin_person_name: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '财务负责人姓名'
        },
        fin_person_mobile: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '财务负责人手机号码'
        },
        fin_person_address: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '财务负责人居住地址'
        }
    });
    return com_fin;
}