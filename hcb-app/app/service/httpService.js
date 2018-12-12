/**
 * Created by lingxi on 2018/2/7.
 */
const request = require('request');
const isJson = require('is-json');
const rule = require('./../../config/system').rule;
const json5 = require('json5');
module.exports = {
    Post: (param = {}) => {
        let http = param._http || 'http';
        let _port = param._port || rule.port;
        let _host = param._host || rule.host;
        let url = `${http}://${_host}:${_port}${param.url}`;
        console.log('访问的url：', url);
        return new Promise(function (resolve, reject) {
            request.post(
                {
                    url: url,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(param)
                }, (error, response, body) => {

                    if (isJson(body, true)) return resolve(json5.parse(body));
                    if (!error && response.statusCode == 200) {
                        if (isJson(body, true)) {
                            resolve(json5.parse(body));
                        } else {
                            reject(error);
                        }
                    } else {
                        reject(error);
                    }
                })
        })
    }
}
