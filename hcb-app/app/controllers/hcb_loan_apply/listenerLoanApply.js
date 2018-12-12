/**
 * 监听借款申请信息
 * Created by lingxi on 2018/2/7.
 */
const log4js = require('../../../lib/log');
const kafkaConfig = require('../../../config/system/index').kafka;
const consumer = require('../../../lib/kafka').consumer(kafkaConfig.topics.loanApply);
const lib = require('./../../../lib');
const sourceToTargetLoanApply = require('./../../../config/map/loan_apply');

const kafkaLog = log4js.getLogger('kafka');
const baseLog = log4js.getLogger('loanApply');
const BLL = require('./BLL');

console.log('监听kafka货车帮借款申请信息队列');
consumer.on('message', function (message) {
    baseLog.info(message.value);
    if (message.value.startsWith('{') && message.value.endsWith('}')) {
        let item = eval(`(${message.value})`);
        item = lib.sources(item.data[0].result, sourceToTargetLoanApply);
        BLL.handleLoanApply(item);
    }
});

consumer.on('error', function (err) {
    console.log('货车帮借款申请信息队列错误');
    console.log(err);
    kafkaLog.error(err.message);
});
