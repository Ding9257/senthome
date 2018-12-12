const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
//const MySQLStore = require('express-mysql-session');

/*
const MySQLStoreOptions = {
    //参考地址https://github.com/chill117/express-mysql-session
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'test',
    //过期时间
    expiration: 1000 * 20,
};
const MySQLsessionStore = new MySQLStore(MySQLStoreOptions);
*/


module.exports = function (app) {
    app.use(express.static(path.join('public')));
    app.use(express.static(path.join('node_modules')));
    app.set('views', path.join('views'));
    app.set('view engine', 'ejs');
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(session({
            secret: 'hcb-app',
            resave: true,
            saveUninitialized: false,
            cookie: {
                maxAge: 30 * 60 * 1000  //session过期时间
            },
            name: 'hcb-app'
        }
    ));
    //用mysql作为用户信息持久化
    // app.use(session({
    //     key: 'hcb-app',
    //     secret: 'hcb-app',
    //     store: MySQLsessionStore,
    //     saveUninitialized: false
    // }));
    app.use(flash());
    app.use(function (req, res, next) {
        let Dialog = req.flash('Dialog');
        Dialog = !!Dialog && !!Dialog.length ? Dialog[0] : '';
        res.locals.Dialog = Dialog;
        res.locals.session = req.session;
        next();
    });
};
