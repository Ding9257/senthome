/**
 * Created by lingxi on 2018/2/2.
 */
const com_fin = require('./../../modules').com_fin;
module.exports = {
    add: (param = {}) => {
        /**
         * 企业-附加信息 com_fin
         * 可以为空字段
         * company_id 企业ID
         * 可以为空
         * opt_status 经营状况
         * financial_contact  财务部联系方式
         * acct_bank 企业开户行
         * bank_card_num 企业银行卡号
         * acct_open_date 开户日期
         * money_source 经营资金来源1自有 2贷款
         * loan_amt 经营贷款金额 （万元）当经营资金来源为贷款需填写
         * credit_level 企业征信等级 1 正常类 2 瑕疵类 3 次级类 4禁入类
         * receivable_m_avg_amt 月均应收账款（万元）
         * receivable_ap 应收账款账期（天）
         * handle_m_avg_amt 月均应付账款（万元）
         * handle_ap 应付账款账期（天）
         * fin_person_name 财务负责人姓名
         * fin_person_mobile 财务负责人手机号码
         * fin_person_address 财务负责人居住地址
         */
        let {
            company_id, opt_status, financial_contact, acct_bank, bank_card_num, acct_open_date, money_source, loan_amt,
            credit_level, receivable_m_avg_amt, receivable_ap, handle_m_avg_amt, handle_ap, fin_person_name, fin_person_mobile, fin_person_address
        } = param;
        let data = {
            company_id,
            opt_status,
            financial_contact,
            acct_bank,
            bank_card_num,
            acct_open_date,
            money_source,
            loan_amt,
            credit_level,
            receivable_m_avg_amt,
            receivable_ap,
            handle_m_avg_amt,
            handle_ap,
            fin_person_name,
            fin_person_mobile,
            fin_person_address
        };
        return com_fin.create(data);
    }
}