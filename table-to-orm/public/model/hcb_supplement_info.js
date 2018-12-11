module.exports = function(sequelize, DataTypes) {
    let hcb_supplement_info = sequelize.define('hcb_supplement_info', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        company_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: ''
        },
        near_three_yeras_admin_bad_note: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: '0',
            comment: '近3年行政处罚及不良记录  0-无记录 1-有记录已修正 2-有记录且未改进'
        },
        company_near_one_years_overdue_note: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: '0',
            comment: '企业近1年征信逾期记录 0-信用记录良好无逾期 1-出现过逾期但情节较轻 2-出现过逾期情节较重 3-出现过严重逾期或信用记录极差或当前扔处于逾期状态'
        },
        controller_near_one_years_overdue_note: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: '0',
            comment: '实际控制人近1年逾期记录'
        },
        assets_total: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '资产总额'
        },
        liabilities_total: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '负债总额'
        },
        net_profit: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '净利润'
        },
        operate_income: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '营业收入'
        },
        average_accounts_receivable: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '平均应收账款'
        },
        company_cash_balance: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '企业现金流量余额'
        },
        business_cash: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '经营活动现金流量'
        },
        this_year_sales_increase: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '本年销售收入增加额'
        },
        last_year_income_lump_sum: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '上年销售收入总额'
        },
        this_year_assets_growth: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '本年度资产增长额'
        },
        early_assets_lump_sum: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '年初资产总额'
        },
        earnings_is_audit: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: '1',
            comment: '财报是否经过审计'
        },
        business_stability: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: '0',
            comment: '业务稳定性'
        },
        company_brand: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: '0',
            comment: '企业品牌'
        }
    });
    return hcb_supplement_info;
}