/**
 * Created by lingxi on 2018/2/11.
 */
const kafkaConfig = require('./../config/system/index').kafka;
const consumer = require('./../lib/kafka').consumer(kafkaConfig.topics.quota);

consumer.on('message', function (message) {
    // let item = eval(`(${message.value})`);
    console.log(JSON.parse(message.value).length);
});

consumer.on('error', function (err) {
    console.log(err);
});