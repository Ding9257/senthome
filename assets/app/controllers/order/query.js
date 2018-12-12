const Order = require('../../modules').t_order;
const t_batch = require('./../../modules').t_batch;
let query;
const nodeSchedule = require('node-schedule');
const page_num = 10;
const assets = require('../assets')

module.exports = query = {
    list: async (req) => {
        let where, offset;
        // params:  current(>=0),  batchId 可选;  orderNo  可选
        if (req.current) offset = (+req.current - 1) * page_num;
        where = {};
        ['batchId', 'orderNo'].forEach((item) => {
            if (req[item]) where[item] = {'$like': `%${req[item]}%`}
        })
        let x = await Order.findAndCountAll({
            where,
            offset,
            limit: page_num
        });
        x.pageCount = Math.ceil(x.count / page_num)
        return x;
    },
    detail: async (req) => {
        let id;

        id = req.id;
        if (!id) throw new Error('parameter id does not exist')

        return await Order.findById(id)
    },
    batchJoinorderDetail: (req) => {
        let id;

        id = req.id;
        if (!id) throw new Error('parameter id does not exist')

        return Order.findOne({
            include: [{
                model: t_batch,
                required: true,
                as: 'batch'
            }],
            where: {
                id
            }
        })
    },
    edit: (req) => {

        if (req instanceof Array) return Promise.all(req.map(function (item) {
            return Order.findById(item.id).then(order => {
                if (!!order.file) {
                    return order.update(item);
                } else {
                    return order;
                }
            }).catch(e => {
                return e
            })
        }));
        return Order.findById(req.id).then(order => {
            return order.update(req)
        }).catch(e => {
            throw e;
        })
    },
    batchAndorderList: async (req) => {
        let where, offset;
        // params:  current(>=0),  batchId 可选;  orderNo  可选
        if (req.current) offset = (+req.current - 1) * page_num;
        where = {};
        ['batchId', 'orderNo'].forEach((item) => {
            if (req[item]) where[item] = {'$like': `%${req[item]}%`}
        })
        if (!!req.states) {
            where.states = req.states;
        }
        if (req.states == 5) {
            where.states = {$ne: 4};
        }
        let x = await Order.findAndCountAll({
            include: [{
                model: t_batch,
                required: true,
                as: 'batch'
            }],
            where,
            offset,
            limit: page_num
        });
        x.pageCount = Math.ceil(x.count / page_num)
        return x;
    }
};

nodeSchedule.scheduleJob('0 0,10,20,30,40,50 * * * *', async function () {
  console.log('定时查询审核结果：')
  Order.findAll({where: {audit_code: 0}, attributes: ['id', 'orderNo', 'batchId']}).then(orders => {
        return Promise.all(orders.map(async function (order) {

            let batch = await t_batch.findOne({where: {batchId: order.batchId}, attributes: ['listing_no']});
            return assets.queryAuditResult({contract_no: order.orderNo, listing_no: batch.listing_no})
                .then(result => {
                    if (parseInt(result.audit_code)) {
                        return order.update({audit_code: result.audit_code})
                    }
                })
                .catch(e => {
                    console.log(e)
                    return null;
                }).then(order => {
                    if (!order) return null;
                    if (parseInt(order.audit_code)) {
                        return require('.').listedResule({
                            orderId: order.orderNo,
                            result: '000000',
                            desc: ''
                        })
                    }
                    return require('.').listedResule({
                        orderId: order.orderNo,
                        result: '999999',
                        desc: 'reject'
                    })
                })
                .then(function (data) {
                    return data;
                })
        }))
    }).then(orders => {
        console.log('orders', orders)
    })
});
