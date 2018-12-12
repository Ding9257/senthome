/**
 * Created by lingxi on 2018/2/1.
 */
const log4js = require('./../../../lib/log');
const kafkaConfig = require('./../../../config/system').kafka;
const consumer = require('./../../../lib/kafka').consumer(kafkaConfig.topics.company);

const kafkaLog = log4js.getLogger('kafka');
const baseLog = log4js.getLogger('base');
const DAL = require('./DAL');
const compantDAL = require('./../company/DAL');
const quotaDAL = require('./../quota/DAL');
const lib = require('./../../../lib');
const sourceFiled = require('./../../../config/map/hcb_company');
const hcb_annex_con = require('./../hcb_annex');
const moment = require('moment');
const credit_con = require('./../quota');

const produce = require('./../../service/produceService').produce;

module.exports = function () {
    console.log('监听kafka货车帮企业基本信息队列');
    consumer.on('message', async function (message) {
        //添加日志
        baseLog.info(message.value);
        //判断传过来的是否为json数据
        if (message.value.startsWith('{') && message.value.endsWith('}')) {
            //转化数据为标准的json数据
            let item = eval(`(${message.value})`);
            let tempSource;
            try {
                tempSource = item.data[0].result;
            } catch (e) {
                return;
            }
            //转化数据为数据库字段
            item = lib.sources(tempSource, sourceFiled);
            //法人
            item.legal_person = item.legal_person_name;

            //处理货车帮 进件资料
            item = hcb_annex_con.arrayToString(item);
            let {org_code, product_id} = item;
            //查询com_base中是否存在org_code的记录
            let baseData = await compantDAL.findOne({
                where: {
                    org_code
                }
            });
            //判断统一社会信用代码（org_code）企业的是否存在记录 存在更新 不存在插入
            if (!!baseData) {
                console.log('准备更新企业信息');
                //判断是否可以再授信 查询com_quota
                item.company_id = baseData.company_id;
                let quotaData = await quotaDAL.findOne({
                    org_code,
                    product_id
                });
                //是否为新产品
                if (!!quotaData) {
                    console.log('不是新产品');
                    let refuse_limit = quotaData.com_quota_additional.refuse_limit;
                    //是否可以发起授信
                    if (await credit_con.isLaunchCredit({org_code, product_id})) {
                        console.log('不在拒贷期内，可以发起授信');
                        item.update_time = moment().valueOf();
                        item.is_hava_produce = true;
                        DAL.update(item);
                    } else {
                        console.log('在拒贷期内，不可以发起授信');
                        //发消息进件审核结果通知
                        let produceInfo = {
                            applyNo: item.apply_no,
                            appId: item.app_id,
                            checkCode: 3,
                            applyProId: item.product_id,
                            refuseEndTime: refuse_limit,
                            approvedAmount: '',
                            approvedTime: '',
                            creditRating: '',
                            msg: '不允许发起授信申请'
                        };
                        produce(produceInfo, kafkaConfig.topics.check)
                    }
                } else {
                    console.log('该企业的新产品，更新企业数据，插入新产品');
                    item.update_time = moment().valueOf();
                    item.is_hava_produce = false;
                    DAL.update(item);
                }
            } else {
                console.log('插入企业信息');
                item.create_time = moment().valueOf();
                //新增
                DAL.addOne(item);
            }
        }
    });

    consumer.on('error', function (err) {
        console.log('货车帮企业基本信息队列错误');
        console.log(err);
        //添加日志
        kafkaLog.error(err.message);
    });
}();

