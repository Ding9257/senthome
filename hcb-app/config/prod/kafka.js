/**
 * Created by lingxi on 2018/2/5.
 */
module.exports = {
    clientHost: 'localhost:2181',
    topics: {
        //监听企业信息
        company: 'company_truck_apply',
        //监听车辆信息
        car: 'company_truck_car',
        //监听ETC信息
        ETC: 'company_truck_etc',
        //额度变更通知
        quota: 'company_quota_notice',
        //授信申请回调
        check: 'company_truck_apply_result',
        //借款申请
        loanApply: 'company_truck_use',
        //借款申请回调
        credit: 'company_truck_use_result'
    }
}