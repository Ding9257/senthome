/**
 * Created by lingxi on 2017/12/25.
 */
const netService = require('../../service/netService');
const system_id = require('./../../../config/system/sys-setting').system_id;
const lib = require('./../../../lib');
const config = require('./../../../config/system/sys-setting');
const roleAuth = require('./../../../lib/roleAuth');

module.exports = {
    login: (req, res, next) => {
        return res.render('user/login')
    },
    loginPost: function (req, res, next) {
        console.log('******************用户登录------发请求******************');
        return res.redirect('/company/list')
        let param = {
            server_host: config.user_server_host,
            defaultPort: config.user_server_port,
            system_id,
            cname: req.body.cname,
            cpwd: req.body.cpwd
        }
        let url = '/api/doLogin.service';
        netService.doPost(url, param, req).then(data => {
            if (data.status * 1 == 200) {
                req.session.user = data.data.tuser;
                req.session.authObj = roleAuth.authObj(data.data.authList);
                return res.redirect('/company/list')
            } else {
                req.flash('Dialog', {
                    title: '失败',
                    content: data.msg
                })
                return res.redirect('/')
            }
        }).catch(err => {
            req.flash('Dialog', err)
            return res.redirect('/')
        })
    },
    changePwdGet: function (req, res, next) {
        console.log('******************修改用户密码******************');
        return res.render('user/edit_user_pwd.ejs', {
            subTitle: '修改密码'
        })
    },
    changePwdPost: function (req, res, next) {
        console.log('******************修改用户密码----发请求******************');
        let oldPwdMd5 = lib.md5(req.body.oldpwd);
        if (oldPwdMd5 != req.session.user.cpwd) {
            req.flash('Dialog', {
                title: '提示',
                content: '原密码错误'
            });
            return res.redirect('/user/changepwd');
        }
        if (req.body.oldpwd == req.body.cpwd) {
            req.flash('Dialog', {
                title: '提示',
                content: '新密码不能与原密码相同'
            });
            return res.redirect('/user/changepwd');
        }

        let url = "/api/updateServiceUser.service";
        req.body.defaultPort = config.user_server_port;
        req.body.server_host = config.user_server_host;
        req.body.system_id = system_id;
        req.body.cid = req.session.user.cid;

        netService.doPost(url, Object.assign({port: 8082}, req.body), req).then(function (result) {
            if (result.status * 1 == 200) {
                req.session.user = null;
                req.flash('Dialog', {
                    title: '成功',
                    content: '修改密码成功，请重新登录！'
                })
                return res.redirect('/');
            } else {
                req.flash("Dialog", {
                    title: '错误',
                    content: result.msg
                });
                return res.redirect('/user/changepwd')
            }
        }).catch(function (err) {
            req.flash("Dialog", err);
            return res.redirect('/user/changepwd')
        });
    },

    regGet: function (req, res, next) {
        return res.render('user/reg')
    },
    emailGetActivationCode: function (req, res, next) {
        let url = '/api/sendMail.service';
        req.body.defaultPort = 8082;
        req.body.system_id = system_id;
        req.body.yzm = parseInt((Math.random() + 1) * 100000);
        netService.doPost(url, req.body, '邮箱获取激活码', res).then(function (data) {
            if (data.status * 1 == 200) {
                req.session.zhuceUser = {cname: req.body.cname, yzm: req.body.yzm}
            }
            res.json(data);
        }).catch(function (err) {
            console.log(err);
            res.json(err);
        })
    },
    zhuce: function (req, res, next) {
        let {crealname, pwd1, pwd2, cname, email, tel, organizationcode, activationcode} = req.body;
        if (!!req.session.zhuceUser) {
            if (!(req.session.zhuceUser.cname == cname && req.session.zhuceUser.yzm == activationcode)) {
                req.flash('Dialog', {
                    title: '错误',
                    content: '用户名与激活码不匹配'
                });
                res.redirect('/reg');
            }
        } else {
            req.flash('Dialog', {
                title: '错误',
                content: '用户名与激活码不匹配'
            });
            res.redirect('/reg');
        }

        let path = "/api/addServiceUser.service";
        let data = {
            cname: cname,
            cpwd: pwd1,
            crealname: crealname,
            cphone: tel,
            cemail: email,
            organizationcode: organizationcode,
            defaultPort: 8082,
            system_id: system_id,
            roleId: 6290432262668288
        };
        netService.doPost(path, data, '用户注册', res).then(function (result) {
            if (result.status * 1 == 200) {
                req.flash('Dialog', {
                    title: '成功',
                    content: result.msg
                });
            } else {
                req.flash('Dialog', {
                    title: '错误',
                    content: result.msg
                });
            }
            res.redirect('/reg');
        }).catch(function (err) {
            req.flash('Dialog', err);
            res.redirect('/reg');
        });
    },
    logout: (req, res, next) => {
        let user;

        user = req.session.user;

        if (!user) {
            req.flash('Dialog', '未登录');
        }

        req.session.user = null;
        return res.redirect('/')
    }
}