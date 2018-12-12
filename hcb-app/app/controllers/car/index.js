/**
 * Created by lingxi on 2018/1/26.
 */
const DAL = require('./DAL');
const sidebarText = '车辆信息';
module.exports = {
    list: async (req, res, next) => {
        let current = !!req.query.current ? req.query.current * 1 : 1;
        let param = {
            current
        }
        let data = await DAL.find(param);
        let pageList = {
            pages: data.pageCount,
            current: current,
            total: data.count,
            url: '/order/list',
            tab: ``
        }
        return res.render('car/list', {
            sidebarText,
            pageList,
            data
        })
    },
    change: (req, res, next) => {
        DAL.upsertCar(req.body).then(d => {
            res.end()
        }).catch(e => {
            next(e)
        });
    }
}