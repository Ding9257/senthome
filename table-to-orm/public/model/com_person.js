module.exports = function(sequelize, DataTypes) {
    let com_person = sequelize.define('com_person', {
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
        legal_person_name: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: '1',
            comment: '法人'
        },
        legal_person_idnum: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: '法人身份证号码'
        },
        legal_person_mobile: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '法人联系方式 必须是手机号'
        },
        legal_person_percent: {
            type: DataTypes.STRING(10),
            allowNull: true,
            comment: '法人持股比例 非股份制填0 '
        },
        controller_name: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: '实际控制人姓名'
        },
        controller_idnum: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: '实际控制人身份证号码'
        },
        controller_mobile: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '实际控制人联系方式 必须是手机号'
        },
        controller_percent: {
            type: DataTypes.STRING(10),
            allowNull: true,
            comment: '实际控制人持股比例  非股份制填0 '
        },
        controller_work_years: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: true,
            comment: '实际控制人从业年限 单位年'
        },
        controller_address: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '实际控制人住址'
        },
        controller_marry_status: {
            type: DataTypes.STRING(10),
            allowNull: true,
            comment: '实际控制人婚姻状况 1 已婚 2未婚 3离异 4丧偶'
        },
        controller_spouse_name: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '实际控制人配偶姓名 当“实际控制人婚姻状况”是“已婚”时填写'
        },
        controller_spouse_idnum: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '实际控制人配偶身份证号码 当“实际控制人婚姻状况”是“已婚”时填写'
        },
        controller_spouse_mobile: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '实际控制人配偶联系方式 当“实际控制人婚姻状况”是“已婚”时填写，必须是手机号'
        },
        controller_relatives_name: {
            type: DataTypes.STRING(10),
            allowNull: true,
            comment: '实际控制人直系亲属姓名 当“实际控制人婚姻状况”不是“已婚”时填写'
        },
        controller_relatives_idnum: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: '实际控制人直系亲属身份证号码 当“实际控制人婚姻状况”不是“已婚”时填写'
        },
        controller_relatives_mobile: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: '实际控制人直系亲属联系方式 当“实际控制人婚姻状况”不是“已婚”时填写，必须是手机号'
        },
        controller_relation: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '直系亲属与实际控制人关系 手动填写，无选项'
        },
        controller_level: {
            type: DataTypes.STRING(10),
            allowNull: true,
            comment: '实际控制人征信等级 1 正常类 2瑕疵类 3次级类 4禁入类'
        }
    });
    return com_person;
}