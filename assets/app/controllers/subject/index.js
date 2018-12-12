/**
 * Created by lingxi on 2017/12/29.
 */
const lib = require('../../../lib')
const t_subject = require('./../../modules').t_subject
const t_order = require('./../../modules').t_order
const config = require('./../../../config')
const qs = require('querystring');
const log4js = require('./../../../lib/log');
const subjectPushLog = log4js.getLogger('subjectPush');

module.exports = {
  main: (req, res, next) => {
    if (lib.isPOST(req)) {
      let str;
      str = ''
      req.on('data', function (data) {
        str += data
      })

      if (lib.isEmpty(req.body)) {
        req.on('end', function () {
          console.log('str ------- >', str)
          try {
            req.body = JSON.parse(str)
          }
          catch (e) {
            req.body = qs.parse(str)
          }
          if (lib.isEmpty(req.body)) {
            return res.json({
              code: '000002',
              message: `参数为空`,
              returns: {}
            });
          }
          console.log('资产池入口');

          next();
        })

      } else {
        if (lib.isEmpty(req.body)) {
          return res.json({
            code: '000002',
            message: `参数为空`,
            returns: {}
          });
        }
        console.log('资产池入口');

        next();
      }
    } else {
      next()
    }
  },
  getPushSubject: (req, res, next) => {
    res.render('order/subject')
  },
  //标的推送
  pushSubject: async (req, res, next) => {
    let order, data;
    subjectPushLog.info(JSON.stringify(req.body));
    if (!(req.body instanceof Array)) req.body = [req.body];
    //检查参数是否缺失

    for (let i = 0; i < req.body.length; i++) {
      let item = req.body[i];
      let str = lib.isObjInProperty(item, config.order.pushSubject.params);
      if (!!str) {
        req.body[i] = {
          code: '000002',
          message: `缺少参数${str}`,
          returns: {}
        };
        continue;
      }
      //验证sign是否一致
      let fast_sign = item.sign;
      delete item.sign;
      let sign = lib.threeMD5Sing(item, item.orderId);
      console.log(sign,fast_sign)
      if (fast_sign != sign) {
        req.body[i] = {
          code: '000001',
          message: `签名不一致${sign}`,
          returns: {}
        };
        continue;
      }

      try {
        order = await
          t_subject.findOne({
            where: {
              orderId: item.orderId
            }
          });
        if (order) {
          req.body[i] = {
            code: '000001',
            returns: {
              orderId: order.orderId,
              returnCode: "999999",
              returnMsg: `保存失败，编号${order.orderId}已存在`
            }
          }
        } else {
          data = await  t_order.findOne({where:{orderNo: item.orderId}});
          if (!data) req.body[i] = {
            code: '000001',
            returns: {
              orderId: item.orderId,
              returnCode: "999999",
              returnMsg: `保存失败，订单编号${item.orderId}不存在`
            }
          }
          else {
            data = await
              t_subject.create(item);
            req.body[i] = {
              code: '000000',
              returns: {
                orderId: data.orderId,
                returnCode: "000000"
              }
            }
          }
        }
      } catch (e) {
        req.body[i] = {
          code: '000001',
          returns: {
            msg: e.message,
            returnCode: "999999",
            returnMsg: `保存失败,系统错误`
          }
        }
      }
    }

    res.json(req.body)
  }
}