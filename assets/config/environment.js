var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');


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
            secret: 'assets-app',
            resave: true,
            saveUninitialized: false,
            cookie: {
                maxAge: 30 * 60 * 1000  //session过期时间
            },
            name: 'loanApp'
        }
    ));
    app.use(flash());
    app.use(function (req, res, next) {
        let Dialog = req.flash('Dialog');
        Dialog = !!Dialog && !!Dialog.length ? Dialog[0] : '';
        res.locals.Dialog = Dialog;
        res.locals.session = req.session;
        next();
    });
};
