/**
 * Created by lingxi on 2018/1/5.
 */
const fastService = module.exports = {};
const request = require('request');
const isJson = require('is-json');
const lib = require('./../../lib');

//post 方法
fastService.Post = function (url, params = {}) {
    if (process.env.NODE_ENV === 'development') {
        console.log(JSON.stringify(params));
    }
    let headers = {'Content-Type': 'x-www-form-urlencoded'}
    return new Promise(function (resolve, reject) {
        request.post({url: url, headers: headers, form: params}, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let item = eval(`(${body})`);

                if (isJson(item, true)) {
                    resolve(JSON.parse(item));
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