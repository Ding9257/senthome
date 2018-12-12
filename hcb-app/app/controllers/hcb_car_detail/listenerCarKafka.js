/**
 * Created by lingxi on 2018/2/1.
 */
const log4js = require('../../../lib/log');
const kafkaConfig = require('../../../config/system/index').kafka;
const consumer = require('../../../lib/kafka').consumer(kafkaConfig.topics.car);

const kafkaLog = log4js.getLogger('kafka');
const baseLog = log4js.getLogger('car');
const DAL = require('./DAL');
const lib = require('../../../lib')
const base = require('../../../config/map/hcb_car_detail')

console.log('监听kafka货车帮车辆信息队列');
consumer.on('message', function (message) {
    baseLog.info(message.value);
    if (message.value.startsWith('{') && message.value.endsWith('}')) {
        let item = eval(`(${message.value})`);
        try{
            item = item.data[0].result.content
        }catch (e){
            return;
        }
        DAL.completeCar(item.datas.map(function (car) {
            return lib.sources(car, base)
        }),item.licenseCode)
    }
});

consumer.on('error', function (err) {
    console.log('货车帮车辆信息队列错误');
    console.log(err);
    kafkaLog.error(err.message);
});

