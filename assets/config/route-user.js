/**
 * Created by lingxi on 2017/12/25.
 */
const controllers = require('./../app/controllers');
module.exports = function (app) {
  app.get('/', controllers.user.login)
  app.post('/login', controllers.user.loginPost)
  app.get('/reg', controllers.user.regGet)
  app.post('/zhuce', controllers.user.zhuce);
  app.post('/emailGetActivationCode', controllers.user.emailGetActivationCode);//邮箱获取激活码

  app.get('/user/changepwd', controllers.user.changePwdGet)
  app.post('/user/changepwd', controllers.user.changePwdPost)

  app.get('/logout',controllers.user.logout)
}