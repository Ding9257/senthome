/**
 * Created by lingxi on 2018/1/26.
 */
const hcb_car_detail = require('./../../modules').hcb_car_detail;
module.exports = {
    find: async (param = {}) => {
        let where, offset;
        let page_num = param.page_num || 10;

        if (param.current) offset = (+param.current - 1) * page_num;
        where = {};
        ['batchId', 'orderNo'].forEach((item) => {
            if (param[item]) where[item] = {'$like': `%${param[item]}%`}
        })
        return hcb_car_detail.findAndCountAll({
            where,
            offset,
            limit: page_num
        }).then(data => {
            data.pageCount = Math.ceil(data.count / page_num);
            return data;
        });
    },
    upsertCar(params) {
        return Promise.all(params.map((p) => {
            return hcb_car_detail.update(p, {where: {id: p.id}}).catch(e => {
                return e
            })
        }))
    }
}