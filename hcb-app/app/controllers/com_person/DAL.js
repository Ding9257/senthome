/**
 * Created by lingxi on 2018/2/2.
 */
const com_person = require('./../../modules').com_person;
module.exports = {
    add: (param = {}) => {
        /**
         * 企业-控制人信息  com_person
         * 不为空字段
         * company_id
         * legal_person_name 有默认值 1 法人
         * 可以为空的
         * legal_person_idnum 法人身份证号码
         * legal_person_mobile  法人联系方式 必须是手机号
         * legal_person_percent 法人持股比例 非股份制填0
         * controller_name 实际控制人姓名
         * controller_idnum 实际控制人身份证号码
         * controller_mobile 实际控制人联系方式 必须是手机号
         * controller_percent 实际控制人持股比例  非股份制填0
         * controller_work_years 实际控制人从业年限 单位年
         * controller_address 实际控制人住址
         * controller_marry_status 实际控制人婚姻状况 1 已婚 2未婚 3离异 4丧偶
         * controller_spouse_name 实际控制人配偶姓名 当“实际控制人婚姻状况”是“已婚”时填写
         * controller_spouse_idnum 实际控制人配偶身份证号码 当“实际控制人婚姻状况”是“已婚”时填写
         * controller_spouse_mobile 实际控制人配偶联系方式 当“实际控制人婚姻状况”是“已婚”时填写，必须是手机号
         * controller_relatives_name  实际控制人直系亲属姓名 当“实际控制人婚姻状况”不是“已婚”时填写
         * controller_relatives_idnum 实际控制人直系亲属身份证号码 当“实际控制人婚姻状况”不是“已婚”时填写
         * controller_relatives_mobile  实际控制人直系亲属联系方式 当“实际控制人婚姻状况”不是“已婚”时填写，必须是手机号
         * controller_relation 直系亲属与实际控制人关系 手动填写，无选项
         * controller_level 实际控制人征信等级 1 正常类 2瑕疵类 3次级类 4禁入类
         */
        let {
            company_id, legal_person_name, legal_person_idnum, legal_person_mobile, legal_person_percent,
            controller_name, controller_idnum, controller_mobile, controller_percent, controller_work_years,
            controller_address, controller_marry_status, controller_spouse_name, controller_spouse_idnum,
            controller_spouse_mobile, controller_relatives_name, controller_relatives_idnum, controller_relatives_mobile,
            controller_relation, controller_level
        } = param;
        let person = {
            company_id,
            legal_person_name,
            legal_person_idnum,
            legal_person_mobile,
            legal_person_percent,
            controller_name,
            controller_idnum,
            controller_mobile,
            controller_percent,
            controller_work_years,
            controller_address,
            controller_marry_status,
            controller_spouse_name,
            controller_spouse_idnum,
            controller_spouse_mobile,
            controller_relatives_name,
            controller_relatives_idnum,
            controller_relatives_mobile,
            controller_relation,
            controller_level
        };
        return com_person.create(person);
    }
}