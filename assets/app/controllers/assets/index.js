/**
 * Created by lingxi on 2017/12/25.
 * 贵州场外机构间市场接口定义
 */
const moment = require('moment');
const threeService = require('./../../service/threeService');
const lib = require('./../../../lib');
const assets = require('./../../../config').assets;
let modole;
module.exports = modole = {
    main: (req, res, next) => {
        console.log('贵州场外机构间市场接口定义');
        next()
    },
    index: function (req, res, next) {
        return res.render('assets/index')
    },
    /**
     * 资产池上传文件通知
     * @param req  noticeDt 通知时间 platNo 平台商编号 fileName 文件名称 sign_type 加密方式 sign MD5加密签名 version 版本号
     * @param res
     * @param next
     */
    assetPoolFile: function (req, res, next) {
        let url = `https://${assets.web.host}/${assets.web.url}/assetPoolFile`;
        let {fileName} = req.body;
        let param = {
            noticeDt: moment().format('YYYY-MM-DD HH:mm:ss'),
            sign_type: 'MD5',
        }
        let sign = lib.threeMD5Sing(param, assets.key);
        param.sign = sign;
        param.platNo = assets.platNo;
        param.fileName = fileName;
        param.version = '0.1';
        threeService.Post(url, param).then(data => {
            if (lib.isEmpty(data.items)) {
                data.items = [];
            }
            return res.json(data)
        }).catch(e => {
            return res.json(e)
        })
    },

    /**
     * @param req
     * queryNo 查询时间
     * platNo 平台商户编号
     * listing_no 挂牌编号
     * sign_type 加密方式
     * sign MD5 加密签名
     * version 版本号
     */
    queryAsset: function (req, res, next) {
        console.log('可用资产查询');
        let url = `https://${assets.web.host}/${assets.web.url}/queryAsset`;
        let param = {
            "queryDt": moment().format('YYYY-MM-DD HH:mm:ss'),
            "sign_type": "MD5"
        }
        let sign = lib.threeMD5Sing(param, assets.key);
        param.sign = sign;
        param.platNo = assets.platNo;
        param.listing_no = assets.listing_no;
        param.version = '0.1';
        threeService.Post(url, param).then(data => {
            return res.json(data)
        }).catch(e => {
            return res.json(e)
        })
    },

    /**
     *审核结果查询接口
     */
    queryAuditResult: (req, res, next) => {
        console.log('审核结果查询接口');
        let url = `https://${assets.web.host}/${assets.web.url}/queryAuditResult`;
        let {contract_no,listing_no} = req.body;
        let param = {
            queryDt: moment().format('YYYY-MM-DD HH:mm:ss'),
            sign_type: 'MD5'
        };
        let sign = lib.threeMD5Sing(param, assets.key);
        param.sign = sign;
        param.platNo = assets.platNo;
        //挂牌编号
        param.listing_no = listing_no;
        param.version = '0.1';
        param.contract_no = contract_no;

        return threeService.Post(url, param).then(data => {
            return res.json(data);
        }).catch(err => {
            return res.json(err);
        });
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
                    console.log(arguments)
                }
            }
            next = rej || function (e) {
                    throw e;
                }
            func(req, res, next)
        })
    }
}
//
// modole.queryAsset({a:'b'}).then(x => {
//   console.log(x)
// }).catch((e)=>{
//
// })