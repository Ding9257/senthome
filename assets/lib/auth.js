const auth = module.exports = {};
var _ = require('lodash');
/*判断是否有权限*/
auth.isAuth = function (collections, url) {
    return _.find(collections, {'authUrl': url}) ? true : false;
}