const netService = module.exports = {};
const request = require('request');
const qs = require('querystring');
const settings = require('../../config/sys-setting');
const lib = require('../../lib');

//post 方法
netService.doPost = function (_path, params, req) {
  let _port = lib.isEmpty(params) ? settings.server_port : lib.isEmpty(params.defaultPort) ? settings.server_port : params.defaultPort;
  let _server_host = lib.isEmpty(params) ? settings.server_host : lib.isEmpty(params.server_host) ? settings.server_host : params.server_host;
  let url = 'http://' + _server_host + ':' + _port + _path;
  console.log('请求后台接口：', url);
  if (!lib.isEmpty(req.session.user)) {
    params.token = req.session.user.tokenId;
    params.cname = req.session.user.cname;
  }
  return new Promise(function (resolve, reject) {
    request.post({url: url, form: params}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        if (body == 'permission expired') {
          req.flash('Dialog', {
            title: '提示',
            content: '您的账号已经在其他地方登陆'
          });
          if (!req.session.user) {
            return;
          }
          req.session.user = null;
          req.res.redirect('/');
          return;
        } else {
          resolve(JSON.parse(body));
        }
      }
      else if (error) {
        var Dialog = {};
        Dialog.title = error.code;
        Dialog.content = error.message;
        reject(Dialog);
      } else {
        var Dialog = {};
        Dialog.title = response.statusCode || lib.outPutStatusCode(response.body);
        Dialog.content = lib.outPutMessage(response.body);
        reject(Dialog);
      }
    })
  })
}

//get 方法（如果params参数没有，要传入logMessage,可以给params传null）
netService.doGet = function (_path, params, req) {
  let _port = lib.isEmpty(params) ? settings.server_port : lib.isEmpty(params.defaultPort) ? settings.server_port : params.defaultPort;
  let _server_host = lib.isEmpty(params) ? settings.server_host : lib.isEmpty(params.server_host) ? settings.server_host : params.server_host;
  let url = 'http://' + _server_host + ':' + _port + _path;
  console.log('请求后台接口：', url);

  if (!!params && typeof params == 'object' && JSON.stringify(params) != '{}') {
    if (url.indexOf('?') == -1) {
      url += '?' + qs.stringify(params);
    } else {
      url += '&' + qs.stringify(params);
    }

  }

  if (!lib.isEmpty(req.session.user)) {
    if (url.indexOf('?') == -1) {
      url += '?token=' + req.session.user.tokenId + '&cname=' + req.session.user.cname;
    } else {
      url += '&token=' + req.session.user.tokenId + '&cname=' + req.session.user.cname;
    }
  }
  return new Promise(function (resolve, reject) {
    request.get({url: url}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        if (body == 'permission expired') {
          req.flash('Dialog', {
            title: '提示',
            content: '您的账号已经在其他地方登陆'
          });
          if (!req.session.user) {
            return;
          }
          req.session.user = null;
          req.res.redirect('/');
          return;
        } else {
          resolve(JSON.parse(body));
        }
      }
      else if (error) {
        var Dialog = {};
        Dialog.title = error.code;
        Dialog.content = error.message;
        reject(Dialog);
      } else {
        var Dialog = {};
        Dialog.title = response.statusCode || lib.outPutStatusCode(response.body);
        Dialog.content = lib.outPutMessage(response.body);
        reject(Dialog);
      }
    })
  })
}