/**
 * Created by lingxi on 2018/2/1.
 */
const models = require('./../../modules');
const client = models.client;
const com_quota = models.com_quota;
const com_base = models.com_base;
const com_level = models.com_level;
const com_quota_additional = models.com_quota_additional;
const hcb_credit_middle = models.hcb_credit_middle;
const hcb_loan_apply = models.hcb_loan_apply;
const moment = require('moment')
const creditConfig = require('./../../../config/system').credit;

module.exports = {
    findOne: (param = {}) => {
        let {org_code, product_id} = param;
        let include = [com_level].map(item => {
            return {
                model: item
            }
        });
        include.push({
            model: com_base,
            where: {
                org_code
            }
        });
        include.push({
            model: com_quota_additional,
            where: {
                product_id
            }
        });
        return com_quota.findOne({
            where: {
                product_id
            },
            include
        })
    },
    findAll: (param = {}) => {
        let limit = param.limit || 10;
        let offset = !!param.current ? (param.current * 1 - 1) * 10 : 0;
        let whereQuota = param.whereQuota || {};
        whereQuota.$or = [
            {freezen_status: 5},
            {freezen_status: 3}
        ]
        let whereBase = param.whereBase || {};
        let include = [];
        include.push({
            model: com_base,
            where: whereBase
        });
        return com_quota.findAndCountAll({
            where: whereQuota,
            include,
            offset,
            limit
        }).then(data => {
            data.pageCount = Math.ceil(data.count / limit);
            return data;
        });
    },
    //根据company_id与product_id获取一条记录
    companyIdAndProductIdFindOne: (param = {}) => {
        let where = {
            company_id: param.company_id,
            product_id: param.product_id
        };
        return com_quota.findOne({where})
    },
    //根据额度编号更新信息
    quotaidToUpdate: (quota_id, param = {}) => {
        return client.transaction(async function (transaction) {
            await com_quota.update(param, {
                transaction,
                where: {
                    quota_id
                }
            });
            await hcb_loan_apply.create(param, {transaction});
        }).catch(err => {
            console.log(err.message);
            throw new Error(err);
        });
    },
    //授信时编辑拒贷期限，返回产品id，进件号
    async setRefuseTime(params) {
        let additional, level, apply;
        if (params.freezen_status == 6) {
            additional = await com_quota_additional.upsert(
                Object.assign({refuse_limit: moment().add(creditConfig.refuseEndTime, 'days').valueOf()},
                    params.toJSON()
                )).then(() => {
                return com_quota_additional.findOne({
                    where: {company_id: params.company_id, product_id: params.product_id},
                    attributes: [['refuse_limit', 'refuseEndTime']]
                })
            })
        }

        apply = await hcb_credit_middle.findOne({
            where: {company_id: params.company_id, product_id: params.product_id},
            attributes: [['apply_no', 'applyNo'], ['app_id', 'appId']],
            order: [['create_time', 'DESC']],
            limit: 1
        })

        level = await com_level.findOne({
            where: {company_id: params.company_id},
            attributes: [['cst_credit_level', 'creditRating']]
        })
        return Object.assign({}, level && level.toJSON(), additional && additional.toJSON(), apply && apply.toJSON())
    }
}