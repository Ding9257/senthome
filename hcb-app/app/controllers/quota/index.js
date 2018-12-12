/**
 * Created by lingxi on 2018/2/1.
 */
const DAL = require('./DAL');
const moment = require('moment');
const creditConfig = require('./../../../config/system').credit;
const BLL = require('./BLL');
const lib = require('./../../../lib');
const sourceFiled = require('./../../../config/map/quota_query');
const httpService = require('./../../service/httpService');
const ruleConfig = require('./../../../config/system').rule;
const sidebarText = '额度管理';

//额度状态
const quotaStatus = [
    {code_value: '1', code_name: '冻结'},
    {code_value: '2', code_name: '终止'},
    {code_value: '3', code_name: '过期'},
    {code_value: '4', code_name: '待授信'},
    {code_value: '5', code_name: '批准'},
    {code_value: '6', code_name: '没授信'}
];

module.exports = {
    codeQuery: async (req, res, next) => {
        let item = lib.sources(req.body, sourceFiled);
        let {org_code, product_id} = item;
        let resData = {
            code: '9',
            msg: '',
            json: {}
        };
        try {
            //查询额度
            let quotaData = await DAL.findOne({org_code, product_id});
            if (!!quotaData) {
                resData.code = '0';
                let {
                    freezen_status, approved_sum, already_used_amount, available_credit, freezing_amount,
                    credit_apply_create_time, credit_apply_expire_time, currency, is_loop
                } = quotaData;

                let cst_credit_level = !!quotaData.com_level ? quotaData.com_level.cst_credit_level : '';
                let result = {
                    freezen_status,
                    approved_sum,
                    cst_credit_level,
                    already_used_amount,
                    available_credit,
                    freezing_amount,
                    credit_apply_create_time,
                    credit_apply_expire_time,
                    currency,
                    is_loop
                };
                resData.json = result;
            } else {
                resData.code = '1';
                resData.msg = `统一社会信用代码为${org_code}的企业不存在额度`;
            }
        } catch (e) {
            resData.msg = e.message;
        }
        return res.json(resData);
    },
    quotaQuery: async (req, res, next) => {
        let {quota_id} = req.body;
        let data = await DAL.findOne({quota_id});
        return res.json(data);
    },
    companyQuery: async function (req, res, next) {
        let {company_id, product_id} = req.params, amount;

        let data = await DAL.companyIdAndProductIdFindOne({company_id, product_id})
        if (req.method == 'GET') {
            data = data.toJSON()
            return res.render('quota/detail', Object.assign({sidebarText: '企业信息'}, data));
        }
        if (req.method == 'POST') {
            if ((!req.body.freezing_amount.trim() || !req.body.approved_sum.trim()) && ['6', '4'].indexOf(req.body.freezen_status) == -1) {
                req.flash('Dialog', {
                    title: '审批结果',
                    content: '请确认审批额度!'
                })
                return res.redirect(req.url)
            } else if (['6', '4'].indexOf(req.body.freezen_status) > -1) {
                req.body = {freezen_status: req.body.freezen_status}
            } else {
                req.body.is_loop = +req.body.is_loop || 0
                req.body.freezen_status = +req.body.freezen_status || undefined
                req.body.available_credit = +req.body.approved_sum - req.body.freezing_amount - data.already_used_amount
                amount = {
                    change_amount: +req.body.approved_sum - data.approved_sum,
                    change_item: 2,
                    change_type: 5
                }
            }

            if (req.body.freezen_status == 5) {
                req.body.last_credit_date = req.body.credit_apply_create_time = moment().valueOf()
                req.body.credit_apply_expire_time = moment().add(creditConfig.creditTime, 'days').valueOf()
            }
            await data.update(req.body)
            res.redirect('/company/list')
            if (data.freezen_status != 6) {
                BLL.change({company_id, product_id}, amount)
            }
            BLL.check(data)
        }
    },
    change: (req, res, next) => {

    },
    /**
     * 是否可以发起授信
     * @param param is object
     * refuse_limit 拒贷时间
     * credit_apply_expire_time 授信终止时间
     * freezen_status 额度状态
     * @returns boolean
     */
    isLaunchCredit: async (param = {}) => {
        try {
            let quotaData = await DAL.findOne(param);
            let data = {
                rejectdate: -99999,
                approvedate: -99999,
                creditstatus: -99999
            }
            if (!!quotaData) {
                let refuse_limit = quotaData.com_quota_additional.refuse_limit || 0;
                let credit_apply_expire_time = quotaData.credit_apply_expire_time || 0;
                let freezen_status = quotaData.freezen_status;
                let today_time = moment().valueOf();
                refuse_limit = refuse_limit * 1 - today_time;
                credit_apply_expire_time = credit_apply_expire_time * 1 - today_time;
                data.rejectdate = module.exports.getDay(refuse_limit);
                data.approvedate = module.exports.getDay(credit_apply_expire_time);
                data.creditstatus = freezen_status;
            }
            data.url = ruleConfig.isLaunchCreditUrl;
            //调用规则引擎 是否可以发起授信
            return httpService.Post(data).then(res => {
                return res.result == 1 ? true : false;
            }).catch(err => {
                return false;
            });
        } catch (e) {
            return false;
        }
    },
    getDay: (time) => {
        return Math.ceil(time / (1000 * 60 * 60 * 24));
    },
    list: async (req, res, next) => {
        let fieldArr = [
            {
                field: 'com_base',
                childField: [
                    {field: 'company_name', title: '企业名称'},
                    {field: 'legal_person', title: '法人姓名'}
                ]
            },
            {field: 'product_id', title: '产品编号'},
            {field: 'freezen_status', title: '额度状态'},
            {field: 'approved_sum', title: '批准额度(分)'},
            {field: 'already_used_amount', title: '已用额度(分)'},
            {field: 'available_credit', title: '可用额度(分)'},
            {field: 'freezing_amount', title: '冻结金额(分)'},
            {field: 'credit_apply_create_time', title: '授信开始日期'},
            {field: 'credit_apply_expire_time', title: '授信终止日期'}
        ];
        let param = {};
        param.current = !!req.query.current ? req.query.current * 1 : 1;
        param.whereBase = !!req.query.company_name ? {company_name: {$like: `%${req.query.company_name}%`}} : '';
        param.whereQuota = req.query.product_id ? {product_id: req.query.product_id} : '';
        let list = await DAL.findAll(param);
        let pageList = {
            pages: list.pageCount,
            current: param.current,
            total: list.count,
            url: '/quota/list',
            tab: `?company_name=${req.query.company_name}&product_id=${req.query.product_id}`
        };

        return res.render('quota/list', {
            list,
            quotaStatus,
            query: req.query,
            pageList,
            sidebarText,
            fieldArr
        });
    }
}