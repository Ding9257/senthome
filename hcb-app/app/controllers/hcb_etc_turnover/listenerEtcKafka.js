/**
 * Created by lingxi on 2018/2/1.
 */
const log4js = require('./../../../lib/log');
const kafkaConfig = require('./../../../config/system').kafka;
const consumer = require('./../../../lib/kafka').consumer(kafkaConfig.topics.ETC);

const kafkaLog = log4js.getLogger('kafka');
const baseLog = log4js.getLogger('etc');
const DAL = require('./DAL');
const lib = require('../../../lib')
const base = require('../../../config/map/hcb_etc_turnover')

console.log('监听kafka货车帮ETC信息队列');
consumer.on('message', function (message) {
    baseLog.info(message.value);
    if (message.value.startsWith('{') && message.value.endsWith('}')) {
        let item = eval(`(${message.value})`),arr = [];
        try{
            item = item.data[0].result.content
        }catch (e){
            return;
        }
        item.datas.forEach(function (etc) {
            if(etc instanceof Array)return arr.concat(etc.map(e=> lib.sources(e,base)))
            arr.push(lib.sources(etc,base))
        })
        DAL.createEtc(arr,item.licenseCode);
    }
});

consumer.on('error', function (err) {
    console.log('货车帮ETC信息队列错误');
    console.log(err);
    kafkaLog.error(err.message);
});

