/**
 * Created by lingxi on 2018/2/1.
 */
const modules = require('./../../modules');
const uuidV1 = require('uuid/v1');

const log4js = require('./../../../lib/log');
const DBLog = log4js.getLogger('DB');

const client = modules.client;
const com_base = modules.com_base;
const com_person = modules.com_person;
const hcb_com_car = modules.hcb_com_car;
const hcb_additional = modules.hcb_additional;
const com_additional = modules.com_additional;
const com_fin = modules.com_fin;
const com_quota = modules.com_quota;
const hcb_annex = modules.hcb_annex;
const com_quota_additional = modules.com_quota_additional;
const hcb_credit_middle = modules.hcb_credit_middle;
const hcb_supplement_info = modules.hcb_supplement_info;
module.exports = {
    addOne: (param = {}) => {
        //生成企业id
        param.company_id = uuidV1();

        /**
         * 企业基本信息 com_base
         * 所需字段
         * 不能为空
         * company_id 企业ID（系统生成，企业在系统中的唯一标识）√
         * org_code 统一社会信用代码 √
         * company_name 企业法定名称 √


         * legal_person 法人姓名 √
         * reg_amt 注册资本(万元) √

         * create_date 成立日期 √

         * de_flag 是否删除 有默认值
         * 可以为空的
         * real_address 实际经营地址 √
         * biz_type 业务类型 √
         * company_type 企业类型    ×
         * company_address 企业住所 ×
         * reg_currency 注册资本币种 ×
         * main_biz 主营范围 ×
         * reg_org 注册登记机关 ×
         * reg_date 注册登记日期 ×
         * license_num 营业执照编号 ×
         * slave_biz 兼营范围 ×
         * reg_type 登记注册类型 ×
         */
        /*let {
         org_code,
         company_name,
         company_type,
         company_address,
         legal_person_name,
         reg_amt,
         reg_currency,
         create_date,
         main_biz,
         reg_org,
         reg_date,
         license_num,
         real_address,
         biz_type,
         slave_biz,
         reg_type
         } = param;


         let base = {
         company_id,
         org_code,
         company_name,
         company_type,
         company_address,
         legal_person: legal_person_name,
         reg_amt,
         reg_currency,
         create_date,
         main_biz,
         reg_org,
         reg_date,
         license_num,
         real_address,
         biz_type,
         slave_biz,
         reg_type
         };
         */
        return client.transaction(async function (transaction) {
            //企业基本信息
            await com_base.create(param, {transaction});

            // 企业-控制人信息  com_person
            await com_person.create(param, {transaction});

            // 货车帮-车辆信息 hcb_com_car
            await hcb_com_car.create(param, {transaction});

            // 货车帮-附加信息 hcb_additional
            await hcb_additional.create(param, {transaction});

            // 企业-附加信息 com_additional
            await com_additional.create(param, {transaction});

            //企业-附加信息 com_fin
            await com_fin.create(param, {transaction});

            //货车帮进件资料 hcb_annex
            await hcb_annex.create(param, {transaction});

            //额度表 com-quota
            let quotaParam = {
                company_id: param.company_id,
                quota_id: uuidV1(),
                product_id: param.product_id,
                freezen_status: 4,
                is_approval: 1
            }
            await com_quota.create(quotaParam, {transaction});

            //企业拒贷期 com_quota_additional
            await com_quota_additional.create(param, {transaction});

            //进件中间表
            await hcb_credit_middle.create(param, {transaction});

            //补录信息表
            await hcb_supplement_info.create(param, {transaction});
        }).catch(err => {
            console.error(err.message);
            DBLog.error(err);
            return err;
        });
    },
    update: (param = {}) => {
        return client.transaction(async function (transaction) {
            //企业基本信息
            await com_base.update(param, {
                transaction,
                where: {
                    company_id: param.company_id
                }
            });

            // 企业-控制人信息  com_person
            await com_person.update(param, {
                transaction,
                where: {
                    company_id: param.company_id
                }
            });

            // 货车帮-车辆信息 hcb_com_car
            await hcb_com_car.update(param, {
                transaction,
                where: {
                    company_id: param.company_id
                }
            });

            // 货车帮-附加信息 hcb_additional
            await hcb_additional.update(param, {
                transaction,
                where: {
                    company_id: param.company_id
                }
            });

            // 企业-附加信息 com_additional
            await com_additional.update(param, {
                transaction,
                where: {
                    company_id: param.company_id
                }
            });

            //企业-附加信息 com_fin
            await com_fin.update(param, {
                transaction,
                where: {
                    company_id: param.company_id
                }
            });

            //货车帮进件资料 hcb_annex
            await hcb_annex.update(param, {
                transaction,
                where: {
                    company_id: param.company_id
                }
            });

            //进件中间表
            await hcb_credit_middle.create(param, {transaction});


            if (param.is_hava_produce) {
                //额度表更新审批状态  com_quota
                let quotaParam = {
                    is_approval: 1
                };
                await com_quota.update(quotaParam, {
                    transaction,
                    where: {
                        company_id: param.company_id,
                        freezen_status: 4,
                        product_id: param.product_id
                    }
                })
            } else {
                //额度表新建产品
                let quotaParam = {
                    company_id: param.company_id,
                    quota_id: uuidV1(),
                    product_id: param.product_id,
                    freezen_status: 4,
                    is_approval: 1
                }
                await com_quota.create(quotaParam, {transaction});
                await com_quota_additional.create(quotaParam, {transaction});
            }
        }).catch(err => {
            console.error(err.message);
            DBLog.error(err);
            return err;
        });
    }
}