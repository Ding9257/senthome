/**
 * Created by lingxi on 2018/1/29.
 */
const controllers = require('./../../app/controllers');
module.exports = function (app) {
    app.get('/company/list', controllers.company.list);
    app.get('/company/add', controllers.company.addGet);
    app.get('/company/edit/:company_id/:product_id', controllers.company.editGet);
    app.post('/company/edit', controllers.company.editPost);
    app.get('/company/delete', controllers.company.delete);
    app.get('/company/info/:company_id', controllers.company.info);
    app.post('/company/sendcredit/:company_id', controllers.company.sendCredit);
    app.get('/company/image/:id',controllers.annex.query)
    app.post('/company/redirect/:id',controllers.company.redirect)
    app.get('/company/redirects/:id',controllers.company.redirected)
}