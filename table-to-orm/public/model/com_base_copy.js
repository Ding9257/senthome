module.exports = function(sequelize, DataTypes) {
    let com_base_copy = sequelize.define('com_base_copy', {
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
            comment: '客户号码'
        },
        org_code: {
            type: DataTypes.STRING(16),
            allowNull: false,
            comment: '统一社会信用代码'
        },
        company_name: {
            type: DataTypes.STRING(80),
            allowNull: false,
            comment: '企业法定名称'
        },
        company_type: {
            type: DataTypes.STRING(10),
            allowNull: false,
            comment: '企业类型'
        },
        company_address: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '企业住所'
        },
        legal_person: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: '1',
            comment: '法人'
        },
        reg_amt: {
            type: DataTypes.STRING(12),
            allowNull: false,
            comment: '注册资本(元)'
        },
        reg_currency: {
            type: DataTypes.STRING(16),
            allowNull: false,
            comment: '注册资本币种'
        },
        create_date: {
            type: DataTypes.STRING(10),
            allowNull: false,
            comment: '成立日期'
        },
        main_biz: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: '主营范围'
        },
        slave_biz: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: '兼营范围'
        },
        reg_type: {
            type: DataTypes.STRING(16),
            allowNull: true,
            comment: '登记注册类型'
        },
        reg_org: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '注册登记机关'
        },
        reg_date: {
            type: DataTypes.STRING(60),
            allowNull: false,
            comment: '注册登记日期'
        },
        license_num: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: '营业执照编号'
        },
        mobile: {
            type: DataTypes.STRING(16),
            allowNull: true,
            comment: '手机号'
        },
        reg_place: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '注册地'
        },
        id_type: {
            type: DataTypes.STRING(5),
            allowNull: true,
            comment: '证件类型'
        },
        id_num: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '证件号码'
        },
        org_reg_date: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '组织机构登记日期'
        },
        org_valid_date: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '组织机构有效日期'
        },
        org_issue_org: {
            type: DataTypes.STRING(16),
            allowNull: true,
            comment: '组织机构代码证颁发机关'
        },
        reg_valid_date: {
            type: DataTypes.STRING(10),
            allowNull: true,
            comment: '注册登记有效日期'
        },
        reg_check_date: {
            type: DataTypes.STRING(10),
            allowNull: true,
            comment: '已注册登记年检日期'
        },
        opt_status: {
            type: DataTypes.STRING(16),
            allowNull: true,
            comment: '经营状况'
        },
        main_product_info: {
            type: DataTypes.STRING(12),
            allowNull: true,
            comment: '主要产品情况'
        },
        opt_area_size: {
            type: DataTypes.STRING(18),
            allowNull: true,
            comment: '经营场地面积(平方米)'
        },
        opt_area_own: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '经营场地所有权'
        },
        financial_contact: {
            type: DataTypes.STRING(12),
            allowNull: true,
            comment: '财务部联系方式'
        },
        investment_subject: {
            type: DataTypes.STRING(18),
            allowNull: true,
            comment: '投资主体'
        },
        eng_name: {
            type: DataTypes.STRING(60),
            allowNull: true,
            comment: '英文名称'
        },
        nation: {
            type: DataTypes.STRING(10),
            allowNull: true,
            comment: '国别'
        },
        enterprise_size: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: '企业规模'
        },
        worker_amt: {
            type: DataTypes.STRING(10),
            allowNull: true,
            comment: '从业人数'
        },
        holding_type: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '控股类型'
        },
        financial_report: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '财务报表类型'
        },
        industry_type: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '行业类型'
        },
        basic_acct_bank: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '基本账户开户行'
        },
        basic_acct_num: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '基本账户账号'
        },
        acct_open_date: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '开户日期'
        },
        public_company_flag: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '上市公司标志'
        },
        stock_cd: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '股票代码'
        },
        listed_city: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '上市地'
        },
        group_flag: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '集团客户标识'
        },
        group_type: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '集团客户类型'
        },
        superior_name: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '上级公司名称'
        },
        superior_org_cd: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '上级公司组织机构代码'
        },
        group_finance_way: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '集团融资形式'
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
        },
        company_membership: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '企业隶属关系'
        },
        cst_class: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '客户种类：工业，商业，建筑业（房地产），农业，乡镇企业，私营企业，其他'
        },
        port_flag: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '进出口权标识'
        },
        is_special_opt: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '是否属特种经营'
        },
        is_point_company: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '地区重点企业'
        },
        is_vantage_company: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '优势企业'
        },
        is_leader_company: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '是否龙头企业'
        },
        is_21_company: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '是否两高一剩企业'
        },
        is_env_through: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '通过环评'
        },
        env_level: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '环境行为等级'
        },
        credit_rel_time: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '建立信贷关系时间'
        },
        is_belong_gzw: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '国资委下属企业'
        },
        have_directorate: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '有无董事会'
        },
        firms_nature: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '企业性质'
        },
        economic_type: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '经济类型:01-全民 02-集团 03-三资 04-个体 05-私营其他'
        },
        area_cd: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '地区编码'
        },
        region: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '行政区域'
        },
        region2: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '行政区域2'
        },
        organizer_org: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '主办机构'
        },
        manage_org: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '管理机构'
        },
        is_co_company: {
            type: DataTypes.STRING(4),
            allowNull: true,
            defaultValue: '1',
            comment: '是否合作商客户'
        },
        sys_credit: {
            type: DataTypes.DECIMAL(16, 2),
            allowNull: true,
            comment: '系统评估额度'
        },
        de_flag: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            defaultValue: '0',
            comment: '是否删除：0未删除，-1删除'
        },
        company_email: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: ''
        },
        lic_start_date: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: ''
        },
        lic_end_date: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: ''
        },
        bank_code: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: ''
        }
    });
    return com_base_copy;
}