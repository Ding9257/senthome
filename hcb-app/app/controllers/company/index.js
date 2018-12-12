/**
 * Created by lingxi on 2018/1/29.
 */
const DAL = require('./DAL');
const BLL = require('./BLL');
const sidebarText = '企业信息';
const httpService = require('../../service/httpService');
const quotaBLL = require('../quota/BLL');
const models = require('../../modules');

/**
 * 字典信息
 */
//近3年行政处罚及不良记录
const nearlyThreeYearsCode = [
    {code_value: '0', code_name: '无记录'},
    {code_value: '1', code_name: '有记录已修正'},
    {code_value: '2', code_name: '有记录且未改进'}
];
//企业近1年征信逾期记录
const nearlyOneYearCreditCode = [
    {code_value: '0', code_name: '信用记录良好无逾期'},
    {code_value: '1', code_name: '出现过逾期但情节较轻'},
    {code_value: '2', code_name: '出现过逾期情节较重'},
    {code_value: '3', code_name: '出现过严重逾期或信用记录极差或当前扔处于逾期状态'}
];
//实际控制人近1年征信记录
const controllerNearlyOneYearCode = [
    {code_value: '0', code_name: '信用记录良好无逾期'},
    {code_value: '1', code_name: '出现过逾期但情节较轻'},
    {code_value: '2', code_name: '出现过逾期情节较重'},
    {code_value: '3', code_name: '出现过严重逾期或信用记录极差或当前扔处于逾期状态'}
];
//财报是否经过审计
const earningsAreAuditedCode = [
    {code_value: '0', code_name: '是'},
    {code_value: '1', code_name: '否'}
];
//业务稳定性
const businessStabilityCode = [
    {code_value: '0', code_name: '为大型企业提供配套、客户群稳定、有长期的合作合同'},
    {code_value: '1', code_name: '为中型企业提供配套、客户群较为稳定'},
    {code_value: '2', code_name: '客户群实力一般，无明显销售渠道优势'},
    {code_value: '3', code_name: '客户群不稳定，客户变动率高，无长期固定销售合同'}
];
//企业品牌
const enterpriseBrandCode = [
    {code_value: '0', code_name: '有自主品牌，有一定的品牌知名度'},
    {code_value: '1', code_name: '有自主品牌，但无明显品牌优势'}
];
//经营场地性质
const opsAreaTypeCode = [
    {code_value: '1', code_name: '自有'},
    {code_value: '2', code_name: '租赁'}
];
//企业征信记录
const creditLevelCode = [
    {code_value: '1', code_name: '正常类'},
    {code_value: '2', code_name: '瑕疵类'},
    {code_value: '3', code_name: '次级类'},
    {code_value: '4', code_name: '禁入类'},
];
//实际控制人征信记录
const controllerLevelCode = [
    {code_value: '1', code_name: '正常类'},
    {code_value: '2', code_name: '瑕疵类'},
    {code_value: '3', code_name: '次级类'},
    {code_value: '4', code_name: '禁入类'}
];
module.exports = {
    list: async (req, res, next) => {
        let fieldArr = [
            {field: 'org_code', title: '统一社会信用代码'},
            {field: 'company_name', title: '企业法定名称'},
            {field: 'company_type', title: '企业类型'},
            {field: 'company_address', title: '企业住所'},
            {field: 'legal_person', title: '法人姓名'},
            {field: 'reg_amt', title: '注册资本(万元)'},
            {field: 'create_date', title: '成立日期'},
            {
                field: 'com_person',
                childField: [
                    {field: 'legal_person_name', title: '法人姓名'}
                ]
            },
            {
                field: 'hcb_com_car',
                childField: [
                    {field: 'other_car_quantity', title: '挂靠车辆数量'}
                ]
            },
            {
                field: 'com_quota',
                childField: [
                    {field: 'product_id', title: '产品id'}
                ]
            }
        ];

        let param = {};
        param.current = !!req.query.current ? req.query.current * 1 : 1;
        let org_code = !!req.query.org_code ? req.query.org_code : '';
        let company_name = !!req.query.company_name ? req.query.company_name : '';
        param.where = {};
        if (!!org_code) {
            param.where.org_code = org_code;
        }
        if (!!company_name) {
            param.where.company_name = {$like: `%${company_name}%`};
        }
        let list = await DAL.findAllQuota(param);
        let pageList = {
            pages: list.pageCount,
            current: param.current,
            total: list.count,
            url: '/company/list',
            tab: `?company_name=${company_name}&org_code=${org_code}`
        };
        return res.render('company/list', {
            list,
            query: req.query,
            fieldArr,
            pageList,
            sidebarText
        })
    },
    addGet: (req, res, next) => {
        return res.render('company/add', {
            sidebarText
        })
    },
    editGet: async (req, res, next) => {
        let company_id = req.params.company_id;
        let product_id = req.params.product_id;
        let param = {
            where: {
                company_id
            }
        }
        let data = await DAL.findOne(param);
        return res.render('company/edit', {
            nearlyThreeYearsCode,
            nearlyOneYearCreditCode,
            controllerNearlyOneYearCode,
            earningsAreAuditedCode,
            businessStabilityCode,
            enterpriseBrandCode,
            opsAreaTypeCode,
            creditLevelCode,
            controllerLevelCode,
            sidebarText,
            data,
            product_id
        })
    },
    editPost: async (req, res, next) => {
        DAL.update(req.body).then(data => {
            req.flash('Dialog', {
                title: '更新数据',
                content: '成功'
            });
        }).catch(err => {
            req.flash('Dialog', {
                title: '更新数据失败',
                content: err.message
            });
        }).then(x=>{
            return res.redirect(req.headers.referer || '/company/list');
        })
    },
    delete: (req, res, next) => {

    },
    info: async (req, res, next) => {

        let company_id = req.params.company_id;
        let param = {
            where: {
                company_id
            }
        };
        let data = await DAL.findOne(param);
        return res.render('company/info', {
            nearlyThreeYearsCode,
            nearlyOneYearCreditCode,
            controllerNearlyOneYearCode,
            earningsAreAuditedCode,
            businessStabilityCode,
            enterpriseBrandCode,
            sidebarText,
            data
        })
    },
    //发起授信
    sendCredit: async (req, res, next) => {
        let url = '/evalCompany';
        httpService.Post(Object.assign({url}, await BLL.getScoreParams({company_id: req.params.company_id})))
            .then(x => {
                if (x.status && x.status != 200) return Promise.reject(x);
                return x;
            }).then(x => {
            return models.com_quota.findOne({
                where: {company_id: req.params.company_id}
            }).then(quota => {
                if (!quota) return;
                return Promise.all([
                    BLL.setCreditQuota(req.params.company_id,x).then(sys_credit=>{
                        quota.update(Object.assign({sys_credit}))
                    }),
                    models.com_level.upsert(Object.assign({
                        company_id: req.params.company_id,
                        cst_credit_level: x.level
                    }, x))
                ])
            })
        }).then(() => {
            res.end()
        }).catch(e => {
            next(e)
        })
    },
    // 打回
    redirect(req, res, next) {
        let msg = req.body.msg;
        let company_id = req.params.id;
        let product_id = req.query.product_id;

        models.hcb_credit_middle.update({status: 3, msg, approve_time: Date.now()}, {
            where: {
                company_id, product_id
            }, order: ['create_time DESC'], limit: 1
        }).catch(e => {
            console.error(e)
            req.flash('Dialog',{
                title:'失败'
            })
        }).then(x=>{
            res.redirect(`/company/edit/${company_id}/${product_id}`)
        })
        quotaBLL.check({company_id, freezen_status: 4, msg, product_id})
    },
    // 打回记录
    async redirected(req, res, next) {
        let current = !!req.query.current ? +req.query.current : 1;
        let company_id = req.params.id;
        let page_num = req.query.page_num || 10;
        // let approve_time = req.query.approve_time;
        let data = await models.hcb_credit_middle.findAndCountAll({
            offset: (+current - 1) * page_num, limit: +page_num,
            where: {
                company_id, status: 3
            }
        });
        let pageList = {
            pages: Math.ceil(data.count / page_num),
            current: current,
            total: data.count,
            url: '/company/redirects',
            tab: ``
        }
        return res.render('company/redirects', {
            pageList,
            data
        })
    }
}