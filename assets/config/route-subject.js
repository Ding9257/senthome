/**
 * Created by lingxi on 2017/12/29.
 */
const Controllers = require('./../app/controllers');
module.exports = function (app) {
    app.all('/subject/*', Controllers.subject.main);
  app.post('/subject/pushSubject', Controllers.subject.pushSubject);//标的推送
  app.get('/subject/pushSubject', Controllers.subject.getPushSubject);
}