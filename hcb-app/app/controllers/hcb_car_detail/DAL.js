const models = require('../../modules')
const hcb_car_detail = models.hcb_car_detail;
const hcb_com_car = models.hcb_com_car;

module.exports = {
    completeCar(params, org_code) {
        params = params || {};

        if (!(params instanceof Array)) params = [params];
        return models.client.transaction()
            .then(t => {
                return hcb_car_detail.destroy({
                    where: {car_no: {$in: params.map(p => p.car_no)}}, transaction: t
                })
                    .then(function () {
                        return hcb_car_detail.bulkCreate(params.map(item => {
                            item.org_code = org_code;
                            return item;
                        }), {transaction: t});
                    }).then(x => {
                        t.commit()
                    }).catch(e => {
                        console.log(e)
                        t.rollback()
                    })
            })
    },
    getCount: (param = {}) => {
        let where = param.where || {};
        return hcb_car_detail.count({where})
    }
};