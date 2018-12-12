module.exports = function(sequelize, DataTypes) {
    let com_additional = sequelize.define('com_additional', {
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        company_id: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false,
            comment: '客户号码'
        },
        ops_area_type: {
            type: DataTypes.STRING(4),
            allowNull: true,
            comment: '经营场地性质  1自有 2 租赁'
        },
        ops_area_size: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            comment: '经营场地面积(平方米)'
        },
        year_rent_fee: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            comment: '年租金费用'
        },
        ops_type: {
            type: DataTypes.STRING(10),
            allowNull: true,
            comment: '运营模式 1 干线 2 市内配送 3其他'
        },
        ops_desc: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '运营模式说明 当“运营模式”选“其他”时填写'
        },
        main_biz_area: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '业务主要区域  1 省内配送 2 跨省配送 3全国配送'
        },
        core_company_name: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '核心企业名称'
        },
        remarked_brand: {
            type: DataTypes.STRING(4),
            allowNull: true,
            defaultValue: '1',
            comment: '是否注册品牌 1 是 2 不是'
        },
        brand_name: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '品牌名称  当“是否注册品牌”选“是”时填写（有多个品牌时填最主要的即可）'
        },
        remark_num: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '1',
            comment: '商标注册号 当“是否注册品牌”选“是”时填写'
        },
        tel: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: '企业固定电话号码'
        },
        legal_person_address: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '企业法人居住地址'
        }
    });
    return com_additional;
}