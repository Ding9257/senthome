/**
 * Created by lingxi on 2018/2/1.
 */
const controllers = require('./../../app/controllers');
module.exports = function (app) {
    app.post('/base/addone', controllers.base.addOne);
}