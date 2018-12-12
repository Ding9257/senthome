const app = require('express')();
const moment = require('moment');
const http = require('http');
const debug = require('debug')('k-n-j-app:server');
const setting = require('./config/system/index');
const environment = require('./config/system/environment');
const routes = require('./config/route');
const lib = require('./lib');

//监听kafka货车帮企业基本信息队列
require('./app/controllers/base/listenerBaseKafka');
//监听kafka货车帮车辆信息队列
require('./app/controllers/hcb_car_detail/listenerCarKafka');
//监听kafka货车帮ETC信息队列
require('./app/controllers/hcb_etc_turnover/listenerEtcKafka');
//监听kafka货车帮借款申请信息队列
require('./app/controllers/hcb_loan_apply/listenerLoanApply');

environment(app);
routes.user(app);//用户管理
app.use(function (req, res, next) {
    //post请求且是开放路由不拦截
    if (setting.sys.openUrl.includes(req.url.toUpperCase()) && lib.isPOST(req)) {
        next()
    } else {
        if (!req.session.user && false) {
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
routes.credit(app);
routes.base(app);
routes.quota(app);//额度信息
routes.car(app);//车辆信息
routes.apply(app); //借款申请信息
routes.company(app);//企业信息
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
    console.log(`assets服务端口号:${setting.sys.port}  启动时间${moment().format('YYYY-MM-DD HH:mm:ss')}`);
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