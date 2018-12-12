const models = require('../../modules');
const hcb_etc_turnover = models.hcb_etc_turnover;
const hcb_car_detail = models.hcb_car_detail;

module.exports = {
    createEtc(params, org_code) {
        params = params || {};

        if (!(params instanceof Array)) params = [params];

        return models.client.transaction()
            .then(t => {
                return hcb_etc_turnover.destroy({
                    where: {
                        etc_no: {
                            $in: params.map(p => p.etc_no)
                        }
                    },
                    transaction: t
                }).then(() => {
                    return hcb_etc_turnover.bulkCreate(params, {transaction: t});
                }).then(() => {
                    t.commit()
                }).catch(e => {
                    t.rollback()
                })
            })
    },
    getAllEtcSum: (param = {}) => {
        let carWhere = param.carWhere || {};
        let etcWhere = param.etcWhere || {};
        return hcb_etc_turnover.sum('amt', {
            where: etcWhere,
            include: {
                model: hcb_car_detail,
                where: carWhere,
            },
            group: 'hcb_car_detail.etc_no'
        })
    },
    getMinTime: (param = {}) => {
        let carWhere = param.carWhere || {};
        let etcWhere = param.etcWhere || {};
        return hcb_etc_turnover.min('xiaofei_date', {
            where: etcWhere,
            include: {
                model: hcb_car_detail,
                where: carWhere
            },
            group: 'hcb_car_detail.etc_no'
        })
    },
    getMaxTime: (param = {}) => {
        let carWhere = param.carWhere || {};
        let etcWhere = param.etcWhere || {};
        return hcb_etc_turnover.max('xiaofei_date', {
            where: etcWhere,
            include: {
                model: hcb_car_detail,
                where: carWhere
            },
            group: 'hcb_car_detail.car_no'
        })
    },
    getCount: (param = {}) => {
        let where = param.where || {};
        let col = param.col || 'etc_no';
        return hcb_etc_turnover.count({
            distinct: true,
            col,
            include: {
                model: hcb_car_detail,
                where: where
            }
        })
    }
}