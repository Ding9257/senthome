/**
 * Created by lingxi on 2018/2/2.
 */
const com_additional = require('./../../modules').com_additional;
module.exports = {
    add: (param = {}) => {
        /**
         * 企业-附加信息 com_additional
         * 不能为空字段
         * company_id 客户号码
         * 可以为空
         * ops_area_type 经营场地性质  1自有 2 租赁
         * ops_area_size 经营场地面积(平方米)
         * year_rent_fee  年租金费用
         * ops_type 运营模式 1 干线 2 市内配送 3其他
         * ops_desc 运营模式说明 当“运营模式”选“其他”时填写
         * main_biz_area 业务主要区域  1 省内配送 2 跨省配送 3全国配送
         * core_company_name 核心企业名称
         * remarked_brand 是否注册品牌 1 是 2 不是
         * brand_name 品牌名称  当“是否注册品牌”选“是”时填写（有多个品牌时填最主要的即可）
         * remark_num  商标注册号 当“是否注册品牌”选“是”时填写
         * tel 企业固定电话号码
         * legal_person_address 企业法人居住地址
         */
        let {
            company_id, ops_area_type, ops_area_size, year_rent_fee, ops_type, ops_desc,
            main_biz_area, core_company_name, remarked_brand, brand_name, remark_num, tel, legal_person_address
        } = param;
        let data = {
            company_id, ops_area_type, ops_area_size, year_rent_fee, ops_type, ops_desc,
            main_biz_area, core_company_name, remarked_brand, brand_name, remark_num, tel, legal_person_address
        };
        return com_additional.create(data);
    }
}