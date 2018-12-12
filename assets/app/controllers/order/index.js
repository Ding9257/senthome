/**
 * Created by lingxi on 2017/12/29.
 */
const moment = require('moment');
const config = require('./../../../config');
const lib = require('./../../../lib');
const fastService = require('./../../service/fastService');
const t_order = require('./../../modules').t_order;
const t_batch = require('./../../modules').t_batch;
const t_subject = require('./../../modules').t_subject;
const log4js = require('./../../../lib/log');
const fast_log = log4js.getLogger('fast');
const orderPushLog = log4js.getLogger('orderPush');
const fastOrderBackLog = log4js.getLogger('orderBack');
const qs = require('querystring');
const orderQuery = require('./query');
const subjectQuery = require('./../subject/query');
const assetsQuery = require('./../assets');
const fs = require('fs');
const path = require('path');
let modole;

module.exports = modole = {
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

    //订单推送
    pushOrder: async (req, res, next) => {
        //检查参数是否缺失
        orderPushLog.info(JSON.stringify(req.body));
        let str = lib.isObjInProperty(req.body, config.order.pushOrder.params);
        if (!!str) {
            return res.json({
                code: '000002',
                message: `缺少参数${str}`,
                returns: {}
            });
        }
        //判断不能为空
        let isBodyInNull = '';
        for (let bodyKey in req.body) {
            if (lib.isEmpty(req.body[bodyKey]) || req.body[bodyKey] == 'null') {
                isBodyInNull = bodyKey;
            }
        }
        if (!!isBodyInNull) {
            return res.json({
                code: '000001',
                message: `${isBodyInNull}为空`,
                returns: {}
            });
        }

        //验证sign是否一致
        let fast_sign = req.body.sign;
        delete req.body.sign;
        let sign = lib.threeMD5Sing(req.body, req.body.orderNo);
        if (fast_sign != sign) {
            return res.json({
                code: '000001',
                message: `签名不一致${sign}`,
                returns: {}
            });
        }

        //查询是否存在批次编号
        let batchRes = await t_batch.findOne({
            where: {batchId: req.body.batchId}
        });
        if (!batchRes) {
            t_batch.create({batchId: req.body.batchId});
        }
        //查询是否存在此条合同编号
        let order = await  t_order.findOne({
            where: {
                orderNo: req.body.orderNo
            }
        });
        if (!!order) {
            //合同编号存在,且是退回状态才可以更新
            if (order.states == 2) {
                req.body.states = 4;
                let data = await order.update(req.body);
                return res.json({
                    code: '000000',
                    returns: {
                        batchId: data.batchId,
                        orderId: data.orderNo,
                        returnCode: "000000"
                    }
                })
            } else {
                return res.json({
                    code: '000001',
                    returns: {
                        batchId: order.batchId,
                        orderId: order.orderNo,
                        returnCode: "999999",
                        returnMsg: `保存失败，合同编号已存在并且${order.states == 1 ? '审核通过' : order.states == 3 ? '审核拒绝' : '待审核'}`
                    }
                })
            }
        } else {
            let data = await t_order.create(req.body);
            return res.json({
                code: '000000',
                returns: {
                    batchId: data.batchId,
                    orderId: data.orderNo,
                    returnCode: "000000"
                }
            })
        }
    },
    pushOrderGet: (req, res, next) => {
        return res.render('order/query');
    },

    //快速订单审批
    Approved: (req, res, next) => {
        fast_log.info(JSON.stringify(req.body))
        let body = req.body;
        let param = {
            serviceName: config.fast.orderApproved.serviceName,
            versionName: config.fast.orderApproved.versionName,
            methodName: config.fast.orderApproved.methodName,
            format: 'json',
            timestamp: moment().unix(),
            appKey: config.fast.orderApproved.appKey
        }
        //先进行编码 成为字符串 在发请求时用
        let encode = encodeURI(JSON.stringify({
                jsonData: JSON.stringify({
                    jsonData: body[0] && body
                })
            }
        ));
        //解码 本地生成sign用
        let decode = decodeURI(encode);
        param.sign = lib.fastMD5Sign(param, decode);
        param.parameter = encode;
        console.log(JSON.stringify(param))
        fastService.Post(config.fast.orderApproved.url, param).then(data => {
            return res.json(data)
        }).catch(e => {
            console.log('错误', e);
            return res.json(e)
        })
    },
    ApprovedGet: (req, res, next) => {
        return res.render('order/approved')
    },

    //快速挂牌结果
    listedResule: (req, res, next) => {
        let body = req.body;
        let param = {
            serviceName: config.fast.ListedResult.serviceName,
            versionName: config.fast.ListedResult.version,
            methodName: config.fast.ListedResult.methodName,
            format: 'json',
            timestamp: moment().unix(),
            appKey: config.fast.ListedResult.appKey
        };
        let decode = decodeURI(JSON.stringify({
            jsonData: JSON.stringify({
                jsonData: [{
                    orderId: body.orderId,
                    result: body.result || '000000',
                    desc: body.desc || '成功'
                }]
            })
        }));
        let encode = encodeURI(decode)
        param.sign = lib.fastMD5Sign(param, decode);
        param.parameter = encode;
        fastService.Post(config.fast.ListedResult.url, param).then(data => {
            return res.json(data);
        }).catch(e => {
            console.log(e);
            return res.json(e);
        })
    },
    listedResuleGet: (req, res, next) => {
        return res.render('order/listed')
    },
    list: async (req, res, next) => {
        let orderNo = !!req.query && !!req.query.orderNo ? req.query.orderNo : '';
        let batchId = !!req.query && !!req.query.batchId ? req.query.batchId : '';
        let current = !!req.query && !!req.query.current ? req.query.current * 1 : 1;
        let states = !!req.query && !!req.query.states ? req.query.states : '';
        let param = {
            orderNo,
            batchId,
            current,
            states
        };
        if (states == 6) {
            param.states = 4
        }
        let data = await orderQuery.batchAndorderList(param);
        if (states == 6) {
            param.states = states
        }
        let pageList = {
            pages: data.pageCount,
            current: current,
            total: data.count,
            url: '/order/list',
            tab: `&batchId=${batchId}&orderNo=${orderNo}&states=${states}`
        }

        return res.render('order/showList', {
            data,
            sidebarText: states == 6 ? '待审批' : states == 5 ? '已审批' : '订单展示',
            pageList,
            param
        })
    },
    listinfo: async (req, res, next) => {
        let id = req.query.id;
        let states = req.query.states;
        let orderList = await orderQuery.batchJoinorderDetail({id});
        let subjectList = await t_subject.findOne({
            where: {
                orderId: orderList.orderNo
            }
        });
        let assetsList = await assetsQuery.queryAuditResult({
            contract_no: orderList.orderNo,
            listing_no: orderList.batch.listing_no
        });
        if (assetsList.code != '000000') {
            // Dialog = {
            //     title: '交易所审核结果',
            //     content: assetsList.message
            // }
        }
        return res.render('order/listInfo', {
            orderList,
            subjectList: subjectList || {},
            sidebarText: states == 6 ? '待审批' : states == 5 ? '已审批' : '订单展示',
            states,
            assetsList,
            limit: {}
        })
    },
    contractUpload: async (req, res, next) => {
        let id = req.body.id;
        let file = `${config.uploadFile.src}/${req.file.filename}`;
        let filename = req.file.originalname;
        let data = await orderQuery.edit({id, file, filename});
        req.flash('Dialog', {
            title: '提示',
            content: '采购合同上传成功'
        });
        return res.redirect(`/order/listinfo?id=${id}&states=${req.body.states}`)
    },
    changeStates: async (req, res, next) => {
        let arr = JSON.parse(req.body.states);
        let orderData = await orderQuery.edit(arr);
        let orderNotFile = '';
        orderData.forEach(item => {
            if (!item.file) {
                return orderNotFile = item.orderNo;
            }
        })
        //快速订单返回
        let fastresultArr = []
        let fastOrderBackArr = orderData.forEach(item => {
            if (item.states != 4) {
                fastresultArr.push({
                    orderId: item.orderNo,
                    result: item.states == 1 ? '000000' : '999999',
                    desc: item.desc
                })
            }
        });
        if (!!fastresultArr.length) {
            let fastreuslt = await modole.Approved(fastresultArr);
            //快速订单返回结果日志
            fastOrderBackLog.info(JSON.stringify(fastreuslt));
        }
        return res.json({state: 200, message: '更新成功', msg: orderNotFile});
    },
    download: function (req, res, next) {
        let fileUrl = path.join(process.cwd(), req.query.fileUrl)
        let fileName = req.query.fileName || 'assets';
        return res.download(fileUrl, fileName);
    },
    isupdate: async (req, res, next) => {
        let id = req.query.id;
        let data = await t_order.findById(id);
        if (!!data.filename) {
            //更新上传文件状态
            await data.update({isUpload: 1});
            req.flash('Dialog', {
                title: '成功',
                content: '已提交'
            });
            return res.redirect('/order/list');
        } else {
            req.flash('Dialog', {
                title: '提示',
                content: '请先上传采购合同'
            });
            return res.redirect(`/order/listinfo?id=${id}`);
        }
    }
}


for (let key in modole) {
    let func = modole[key];

    modole[key] = function (req, res, next) {
        if (res) {
            return func(req, res, next)
        }
        if (!req) req = {};
        req = {
            body: req,
            query: req
        }
        return new Promise(function (res, rej) {
            res = {
                json: res, render: function () {
                }
            }
            next = rej || function (e) {
                throw e;
            }
            func(req, res, next)
        })
    }
}
