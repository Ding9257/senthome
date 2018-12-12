const companyDAL = require('./DAL');
const carDAL = require('./../hcb_car_detail/DAL');
const EtcDAL = require('./../hcb_etc_turnover/DAL');
const moment = require('moment');
const BLL = {
    /**
     * 获取评分所需要的参数
     * @param param
     */
    getScoreParams: async function (param = {}) {
        let obj = {
            capitalamount: 0,                  //注册资本
            creatime: 0,                       //成立年限
            penaltyrecord: 0,                  //近3年行政处罚及不良记录
            sitetype: 0,                       //经营场地类型
            trucknumber: 0,                    //货车数量
            owntrucknumber: 0,                 //自有车辆数量
            owntruckrate: 0,                   //自有车辆占比
            loantruckrate: 0,                  //贷款车量占比
            insurancetruckrate: 0,             //具有商业险车辆比例
            last1yearETCamount: 0,             //过去一年内月均ETC消费金额
            truckutilization: 0,               //货车利用率
            workingyears: 0,                   //经营者从业年限
            cooperationyears: 0,               //货车帮合作年限
            businessscope: 0,                  //业务范围
            businesscreditrating: 0,           //企业征信记录
            ownercreditrating: 0,              //实际控制人征信记录
            businessoverdueperformance: 0,     //企业近1年征信逾期记录
            owneroverdueperformance: 0,        //实际控制人近1年征信记录
            generalassets: 0,                  //资产总额
            liabilityratio: 0,                 //资产负债率
            netprofitmargin: 0,                //净利率
            turnoverratioofreceivable: 0,      //应收账款周转率
            cashflowbalance: 0,                //企业现金流量余额
            cashflowsfromoperating: 0,         //经营活动现金流量
            salesgrowthrate: 0,                //销售增长率
            assetgrowthrate: 0,                //总资产增长率
            businessstability: 0,              //业务稳定性
            businessbrand: 0,                  //企业品牌
            score: 0                           //总得分
        };

        let {company_id} = param;
        let companyData = await companyDAL.findOne({where: {company_id}});
        //注册资本
        obj.capitalamount = companyData.reg_amt;
        //成立年限
        obj.creatime = this.getYears(moment().valueOf() - moment(companyData.create_date).valueOf());
        // 近3年行政处罚及不良记录
        obj.penaltyrecord = companyData.hcb_supplement_info.near_three_yeras_admin_bad_note;
        //经营场地类型
        obj.sitetype = companyData.com_additional.ops_area_type;
        let org_code = companyData.org_code;
        //货车数量
        obj.trucknumber = await carDAL.getCount({
            where: {
                org_code
            }
        });
        //自有车辆数量
        obj.owntrucknumber = await carDAL.getCount({
            where: {
                org_code,
                linked: 0
            }
        });
        //自有车辆占比
        obj.owntruckrate = obj.owntrucknumber / obj.trucknumber * 100;
        let loantruckrate = await carDAL.getCount({
            where: {
                org_code,
                loan: 1
            }
        });
        //贷款车量占比
        obj.loantruckrate = loantruckrate / obj.trucknumber * 100;
        let insurancetruckrate = await carDAL.getCount({
            where: {
                org_code,
                insured: 1
            }
        });
        //具有商业险车辆比例
        obj.insurancetruckrate = insurancetruckrate / obj.trucknumber * 100;

        //一年前的时间
        let oneYearTime = moment().subtract(1, 'year').valueOf();
        let etcTotal = await EtcDAL.getAllEtcSum({carWhere: {org_code}, etcWhere: {out_time: {$gte: oneYearTime}}});
        let etcMinTime = await EtcDAL.getMinTime({carWhere: {org_code}, etcWhere: {out_time: {$gte: oneYearTime}}});
        let etcMaxTime = await EtcDAL.getMaxTime({carWhere: {org_code}, etcWhere: {out_time: {$gte: oneYearTime}}});
        //过去一年内月均ETC消费金额
        obj.last1yearETCamount = etcTotal / this.getMonth(etcMaxTime - etcMinTime);
        let etcCount = await EtcDAL.getCount({where: {org_code}});
        //货车利用率
        obj.truckutilization = etcCount / obj.trucknumber * 100;
        //经营者从业年限
        obj.workingyears = companyData.com_person.controller_work_years;
        //货车帮合作年限
        obj.cooperationyears = this.getYears(moment().valueOf() - moment(companyData.hcb_additional.co_years).valueOf());
        //业务范围
        obj.businessscope = await EtcDAL.getCount({where: {org_code}, col: 'service'});
        //企业征信记录
        obj.businesscreditrating = companyData.com_fin.credit_level;
        //实际控制人征信记录
        obj.ownercreditrating = companyData.com_person.controller_level;
        //企业近1年征信逾期记录
        obj.businessoverdueperformance = companyData.hcb_supplement_info.company_near_one_years_overdue_note;
        //实际控制人近1年征信记录
        obj.owneroverdueperformance = companyData.hcb_supplement_info.controller_near_one_years_overdue_note;
        //资产总额
        obj.generalassets = companyData.hcb_supplement_info.assets_total;
        //资产负债率
        obj.liabilityratio = companyData.hcb_supplement_info.liabilities_total / companyData.hcb_supplement_info.assets_total * 100;
        //净利率
        obj.netprofitmargin = companyData.hcb_supplement_info.net_profit / companyData.hcb_supplement_info.operate_income * 100;
        //应收账款周转率
        obj.turnoverratioofreceivable = companyData.hcb_supplement_info.operate_income / companyData.hcb_supplement_info.average_accounts_receivable * 100;
        //企业现金流量余额
        obj.cashflowbalance = companyData.hcb_supplement_info.company_cash_balance;
        //经营活动现金流量
        obj.cashflowsfromoperating = companyData.hcb_supplement_info.business_cash;
        //销售增长率
        obj.salesgrowthrate = companyData.hcb_supplement_info.this_year_sales_increase / companyData.hcb_supplement_info.last_year_income_lump_sum * 100;
        //总资产增长率
        obj.assetgrowthrate = companyData.hcb_supplement_info.this_year_assets_growth / companyData.hcb_supplement_info.early_assets_lump_sum * 100;
        //业务稳定性
        obj.businessstability = companyData.hcb_supplement_info.business_stability;
        //企业品牌
        obj.businessbrand = companyData.hcb_supplement_info.company_brand;
        console.log('评分参数：%j', obj);
        return obj;
    },
    /**
     * 获取年限
     * @param timeStamp
     * @returns {number}
     */
    getYears: (timeStamp) => {
        return timeStamp / (1000 * 60 * 60 * 24 * 365);
    },
    getMonth: (timeStamp) => {
        let number = timeStamp / (1000 * 60 * 60 * 24 * 30);
        return number == 12 ? 12 : Math.ceil(number);
    },
    setCreditQuota(company_id,x){
        companyDAL.findCreditInfo(company_id).then((data)=>{
            let credit_quota_amount = Math.log(data.base_date)/2*Math.log(data.car_count)/5
                *data.car_avg_day*data.day_avg_amt*(x.ratio || 1);
            return credit_quota_amount;
        })
    }
};
module.exports = BLL;

