/**
 * Created by lingxi on 2017/12/25.
 */
const controllers = require('./../app/controllers');
module.exports = function (app) {
    app.all('/assets/*',controllers.assets.main)
    app.get('/assets/index', controllers.assets.index);
    app.post('/assets/assetPoolFile', controllers.assets.assetPoolFile);
    app.post('/assets/queryAsset', controllers.assets.queryAsset);
    app.post('/assets/queryAuditResult', controllers.assets.queryAuditResult);
}