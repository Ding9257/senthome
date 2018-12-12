/**
 * Created by lingxi on 2018/1/26.
 *  企业车辆信息
 */
const controllers = require('./../../app/controllers');
const middleware = require('./../../app/middleware');
module.exports = function (app) {
    app.get('/car/list', controllers.car.list);
    app.post('/car/list',controllers.car.change);
}