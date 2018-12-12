const moment = require('moment');
const config = require('./../../../config');
const lib = require('./../../../lib');
const fastService = require('./../../service/fastService');
const Batch = require('./../../modules').t_batch;
const Subject = require('./../../modules').t_subject;
const Order = require('./../../modules').t_order;
const log4js = require('./../../../lib/log');
const path = require('path');
const page_num = 10;
const sidebarText = '融资管理';

module.exports = {
    list: (req, res, next) => {
        let offset, data;

        data = {
            rows: [],
            err: {},
            pageList: {
                pages: 0,
                current: req.query.current || 1,
                total: 0,
                url: req.path,
                tab: ''
            }
        }
        if (req.query.current) offset = (+req.query.current - 1) * page_num;

        Batch.findAndCountAll({
            offset,
            limit: page_num
        }).then(x => {
            Object.assign(data.pageList, {
                pages: Math.ceil(x.count / page_num),
                total: x.count
            })
            return x;
        }).catch(err => {
            return {err};
        }).then(result => {
            return res.render('batch/list.ejs', Object.assign(data, result, {sidebarText}))
        })

    },
    get: (req, res, next) => {
        let id;

        id = req.params.id;

        Batch.findById(id).then(x => {
          return Order.findAll({where:{batchId:x.batchId},attributes:['receivable']})
            .then(data=>{
                x = x.toJSON()
                x.amountMax = data[0]?data.reduce((pre,next)=>{
                   return pre + +next.receivable ||0;
                },0):0
                return x;
            })
        }).then(x=>{
          res.render('batch/detail.ejs', {batch: x || {}, sidebarText})
        }).catch(e=>{
            next(e)
        })
    },
    put: (req, res, next) => {
        let id;

        id = req.params.id;
        if(!req.body.listing_no || !req.body.listing_name)return res.redirect(req.url);
        Batch.findById(id).then(batch => {
            if (!batch)return Promise.reject('no id')
            return batch.update(req.body)
        }).then(x => {
            res.redirect('/batch/list')
        }).catch(e => {
            res.redirect(req.url)
        })
    },
    txtPage: (req, res, next) => {
        let id, filename;
        id = req.params.id;
        filename = req.body.filename;
        Batch.findById(id).then(x => {
            x = x.toJSON()
            if (req.method == 'GET')return Promise.reject({err: {}, batch: x})
            filename = filename || `${config.assets.platNo}_${x.listing_no}_ASSET_${moment().format('YYYYMMDDHHmmss')}.txt`;
            return Order.findAll({where: {batchId: x.batchId, states: 1}}).then(orders => {
                let args = {};
                return Subject.findAll({
                    where: {
                        orderId: {
                            '$in': orders.map((i, j) => {
                                return i.orderNo
                            })
                        }
                    }
                })
                    .then(subjects => {
                        return subjects.map(i => Object.assign(i.toJSON(), {
                            orderNo: i.orderId,
                            listing_no: x.listing_no,
                            listing_name: x.listing_name,
                            filename: orders.find(order => order.orderNo == i.orderId).filename
                        }))
                    })
            }).then(data => {
                return lib.createTxtFile(
                    path.join(process.cwd(),
                        `public/txts/${filename}`),
                    data)
                    .then(txt => {
                        return {err: {}, filename, filePath: `/txts/${filename}`, batch: x}
                    });
            }).catch(err => {
                return {err, batch: x, filename: '', filePath: ''};
            })
        }).catch(({err, batch}) => {
            return {err, batch: batch || {}, filename: '', filePath: ''};
        }).then(txt => {
            res.render('batch/txt.ejs', Object.assign({sidebarText}, txt, {data: {}}))
        })
    }
}