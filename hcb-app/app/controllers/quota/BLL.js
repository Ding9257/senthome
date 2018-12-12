/**
 * Created by lingxi on 2018/2/5.
 */
const produceService = require('../../service/produceService');
const kafkaConfig = require('../../../config/system').kafka;
const compantDAL = require('./../company/DAL');
const quotaDAL = require('./DAL');
const levelDAL = require('./../com_level/DAL');

module.exports = {
    /**
     * 额度变更通知
     * @param param is object
     * company_id product_id
     * * @param changeQuota 变更额度
     */
    change: async (param = {}, amountOptions = {}) => {
        let {change_amount, change_item, change_type} = amountOptions;
        let {company_id, product_id} = param;
        let companyData = await compantDAL.findOne({
            where: {
                company_id
            }
        });
        let quotaData = await quotaDAL.companyIdAndProductIdFindOne({
            company_id,
            product_id
        });
        let levelData = await levelDAL.findOne({
            where: {
                company_id
            }
        });
        if (!!companyData && !!quotaData && !!levelData) {
            console.log('发送额度变更通知');
            let org_code = companyData.org_code;
            let cst_credit_level = levelData.cst_credit_level;
            let {freezen_status, approved_sum, already_used_amount, available_credit, freezing_amount, currency, is_loop} = quotaData;
            let info = {
                product_id,
                org_code,
                freezen_status, approved_sum, already_used_amount, available_credit, freezing_amount,
                change_amount,
                currency, is_loop, cst_credit_level, change_item, change_type
            };
            produceService.produce(info, kafkaConfig.topics.quota)
        }
    },
    async check(params) {
        let data = await quotaDAL.setRefuseTime(params)
        data.applyProId = params.product_id

        if (params.freezen_status == 5) {
            Object.assign(data, {
                checkCode: 0,
                approvedAmount: params.approved_sum,
                approvedTime: params.credit_apply_create_time
            })
        } else if(params.freezen_status == 4){
            Object.assign(data,{
                checkCode:3,msg:params.msg
            })
        } else {
            Object.assign(data, {
                checkCode: -1,
            })
        }
        console.log('授信结果通知');
        return console.log(data)
        produceService.produce(data, kafkaConfig.topics.check)
    }
}