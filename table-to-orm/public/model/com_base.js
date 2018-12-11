module.exports = function(sequelize, DataTypes) {
    let com_base = sequelize.define('com_base', {
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
            comment: '企业ID（系统生成，企业在系统中的唯一标识）'
        },
        org_code: {
            type: DataTypes.STRING(18),
            allowNull: false,
            unique: true,
            defaultValue: '',
            comment: '统一社会信用代码'
        },
        company_name: {
            type: DataTypes.STRING(80),
            allowNull: false,
            comment: '企业法定名称'
        },
        company_type: {
            type: DataTypes.STRING(10),
            allowNull: true,
            defaultValue: '',
            comment: '企业类型'
        },
        company_address: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: '',
            comment: '企业住所'
        },
        legal_person: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: '1',
            comment: '法人姓名'
        },
        reg_amt: {
            type: DataTypes.STRING(12),
            allowNull: false,
            comment: '注册资本(万元)'
        },
        reg_currency: {
            type: DataTypes.STRING(16),
            allowNull: true,
            defaultValue: '',
            comment: '注册资本币种'
        },
        create_date: {
            type: DataTypes.STRING(15),
            allowNull: false,
            defaultValue: '',
            comment: '成立日期'
        },
        main_biz: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '',
            comment: '主营范围'
        },
        reg_org: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: '',
            comment: '注册登记机关'
        },
        reg_date: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '',
            comment: '注册登记日期'
        },
        license_num: {
            type: DataTypes.STRING(20),
            allowNull: true,
            defaultValue: '',
            comment: '营业执照编号'
        },
        de_flag: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
            defaultValue: '0',
            comment: '是否删除：0未删除，-1删除'
        },
        real_address: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '实际经营地址'
        },
        biz_type: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '业务类型'
        },
        slave_biz: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '兼营范围'
        },
        reg_type: {
            type: DataTypes.STRING(10),
            allowNull: true,
            comment: '登记注册类型'
        },
        create_time: {
            type: DataTypes.STRING(15),
            allowNull: true,
            comment: '首次记录时间'
        },
        update_time: {
            type: DataTypes.STRING(15),
            allowNull: true,
            comment: '更新记录时间'
        }
    });
    return com_base;
}