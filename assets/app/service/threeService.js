/**
 * Created by lingxi on 2017/12/18.
 * 三方服务请求
 */
const threeService = module.exports = {};
const request = require('request');
const isJson = require('is-json');
const lib = require('./../../lib');

//post 方法
threeService.Post = function (url, params = {}) {
    if (process.env.NODE_ENV === 'development') {
        console.log(JSON.stringify(params));
    }
    return new Promise(function (resolve, reject) {
        request.post({url: url, form: JSON.stringify(params), timeout: 1000 * 20}, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                if (isJson(body, true)) {
                    resolve(JSON.parse(body));
                } else {
                    var Dialog = {};
                    Dialog.title = 500;
                    Dialog.content = '返回的数据格式错误，不是json';
                    reject(Dialog);
                }
            } else {
                var Dialog = {};
                Dialog.title = !!response ? response.statusCode || lib.outPutStatusCode(response.body) : '错误';
                Dialog.content = !!response ? lib.outPutMessage(response.body) : error.message;
                reject(Dialog);
            }
        })
    })
}