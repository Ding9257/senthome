const controllers = require('./../../app/controllers');
const middleware = require('./../../app/middleware');
module.exports = function (app) {
    app.get('/apply/list', controllers.apply.list);
    ['get','post'].forEach(m=>app[m]('/apply/:id',controllers.apply.put));
    app.get('/apply/detail/:loanid',controllers.apply.detail)

}