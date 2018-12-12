/**
 * 授信 credit
 */
const controllers = require('./../../app/controllers');
module.exports = function (app) {
    app.post('/credit/islaunch', controllers.credit.isLaunch)
}