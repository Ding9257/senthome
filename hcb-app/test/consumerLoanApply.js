/**
 * 借款回调
 * Created by lingxi on 2018/2/11.
 */
const kafkaConfig = require('./../config/system/index').kafka;
const consumer = require('./../lib/kafka').consumer(kafkaConfig.topics.company);

consumer.on('message', function (message) {
    let item = eval(`(${message.value})`);
    console.log(item);
});

consumer.on('error', function (err) {
    console.log(err);
});