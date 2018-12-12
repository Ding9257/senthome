const app = require('express')();
const http = require('http');
const debug = require('debug')('k-n-j-app:server');
const setting = require('./config/index');
const environment = require('./config/environment');
const routes = require('./config/routes');
const lib = require('./lib');

// app.use(function (req,res,next) {
//   if(req.method != 'POST')return next();
//   console.log(req.ip,req.url,new Date())
//   if(req.url.toUpperCase().indexOf('/ORDER/PUSHORDER')>-1 || req.url.toUpperCase().indexOf('/SUBJECT/PUSHSUBJECT')>-1) {
//     console.log(req.headers)
//     delete req.headers['content-type']
//     delete req.headers['content-encoding']
//
//     let str = ''
//     req.on('data',function (data) {
//       str += data
//     })
//     req.on('end',function () {
//       console.log('推送来的数据为=======>',str)
//     })
//     return
//   }
//   next()
// })

environment(app);
//路由
routes.user(app);
app.use(function (req, res, next) {
    //post请求且是开放路由不拦截
    if (setting.sys.openUrl.includes(req.url.toUpperCase()) && lib.isPOST(req)) {
        next()
    } else {
        if (!req.session.user) {
            if (lib.isAjax(req)) {
                return res.json({referer: '/'});
            } else {
                return res.redirect('/');
            }
        } else {
            return next()
        }
    }
});
routes.assets(app);
routes.order(app);
routes.subject(app);
routes.policy(app);
app.use((err, req, res, next) => {
    if (lib.isAjax(req)) {
        return res.status(500).json(err);
    } else {
        return res.render('error', {
            err
        })
    }
})
const httpServer = http.createServer(app);
httpServer.listen(setting.sys.port, function () {
    console.log('assets服务端口号:%s', setting.sys.port);
});
httpServer.on('error', onError);

function onError(error) {
    console.log('http error');
    if (error.syscall !== 'listen') {
        throw error;
    }
    // handle specific listen errors with friendly messages
    //处理特殊error 的友好信息
    switch (error.code) {
        case 'EACCES':
            console.error(' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(' 端口被占用!');
            process.exit(1);
            break;
        default:
            throw error;
    }
}