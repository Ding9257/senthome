/**
 * Created by lingxi on 2018/2/1.
 */
const controllers = require('./../../app/controllers');
module.exports = function (app) {
    //额度查询  通过统一社会信用代码
    app.post('/quota/codequery', controllers.quota.codeQuery);
    //额度查询  通过额度id
    app.post('/quota/quotaquery', controllers.quota.quotaQuery);
    // 额度查询 通过企业id
    app.get('/quota/:company_id/:product_id',controllers.quota.companyQuery);
    app.post('/quota/:company_id/:product_id',controllers.quota.companyQuery);
    //额度列表
    app.get('/quota/list',controllers.quota.list);
}