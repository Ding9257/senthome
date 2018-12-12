/**
 * Created by lingxi on 2018/2/7.
 */
const companyDAL = require('./../company/DAL');
const comQuotaDAL = require('./../quota/DAL');
const producer = require('./../../service/produceService').produce;
const hcbLoanApplyTopic = require('./../../../config/system').kafka.topics.credit;
const quotaBLL = require('./../quota/BLL');
const moment = require('moment');
module.exports = {
    //处理借款申请信息
    handleLoanApply: async (param = {}) => {
        /**
         * bid_num 借款编号
         * apply_no 进件编号
         * app_id 渠道号
         */
        let {product_id, org_code, loan_amt, bid_num, app_id, etc_no, car_no} = param;
        let callBackinfo = {
            app_id,
            bid_num,
            product_id,
            check_code: -1,
            reason: ''
        };
        try {
            //根据统一社会信用代码查com_base表获取company_id
            let companyData = await companyDAL.findOne({
                where: {
                    org_code
                }
            });
            if (!!companyData) {
                //有公司记录
                param.company_id = companyData.company_id;

                //获取公司该产品的额度信息
                //根据company_id与产品id（product_id）查com_quota获取对应数据quotaData
                let quotaData = await comQuotaDAL.companyIdAndProductIdFindOne(param);

                //判断额度状态是否为批准
                if (quotaData.freezen_status == 5) {
                    let available_credit = quotaData.available_credit * 1;
                    loan_amt = loan_amt * 1;
                    //借款金额是否小于可用金额
                    if (available_credit >= loan_amt) {
                        console.log('开始借钱');
                        let already_used_amount = quotaData.already_used_amount * 1;
                        //目前可用余额
                        let current_available_credit = available_credit - loan_amt;
                        //目前已用余额
                        let current_already_used_amount = already_used_amount + loan_amt;
                        //更新额度表com_quota 新增借款信息表hcb_loan_apply

                        let quotaAndLoanData = {
                            available_credit: current_available_credit,
                            already_used_amount: current_already_used_amount,
                            company_id: companyData.company_id,
                            product_id,
                            loan_amt,
                            etc_no,
                            car_no,
                            bid_num,
                            loan_time: moment().valueOf()
                        }
                        await comQuotaDAL.quotaidToUpdate(quotaData.quota_id, quotaAndLoanData);
                        callBackinfo.check_code = 0;
                        callBackinfo.reason = '';
                        //发送额度变更消息
                        quotaBLL.change(
                            {
                                company_id: companyData.company_id,
                                product_id
                            }, {
                                change_amount: 0,
                                change_item: 3,
                                change_type: 1
                            })
                        console.log('放款成功');
                    } else {
                        //额度不足
                        callBackinfo.reason = '可用余额不足';
                    }
                } else {
                    callBackinfo.reason = '额度不是批准状态';
                }
            } else {
                //不存在org_code这个企业
                callBackinfo.reason = `不存在统一社会信用代码为${org_code}的企业`;
            }
            //借款回调
            return producer(callBackinfo, hcbLoanApplyTopic);
        } catch (e) {
            callBackinfo.reason = e.message;
            return producer(callBackinfo, hcbLoanApplyTopic);
        }
    }
};