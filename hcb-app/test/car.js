/**
 * Created by lingxi on 2018/2/5.
 */
const kafka = require('kafka-node');
const kafka_config = require('./../config/system').kafka;
const HighLevelProducer = kafka.HighLevelProducer;
const Client = kafka.Client;
const client = new Client(kafka_config.clientHost);
const topic = kafka_config.topics.car;
const producer = new HighLevelProducer(client, {
    messageSetSize: 10240 * 10204 * 10240
});
const uuid = require('uuid/v1');
const lib = require('./../lib');

producer.on('ready', function () {
    let arr = [];
    for (let i = 0; i < 30; i++) {
        let obj = {
            org_code: '135817351000',
            owner: '所有人',
            car_type: '车辆类型',
            car_no: `${parseInt(Math.random() * 100)}${parseInt(Math.random() * 100)}${parseInt(Math.random() * 100)}${parseInt(Math.random() * 100)}${parseInt(Math.random() * 100)}`,
            etc_no: `ETC${uuid()}`,
            linked: '1',
            loan: '1',
            insured: '1',
            insured_amt: '10000'
        }
        arr.push(obj);
    }
    let info = [
        {topic: topic, messages: JSON.stringify(arr)}
    ];
    producer.send(info, function (err, data) {
        if (err) console.log('err:', err);
        else {
            client.close(function () {
                console.log('kafka关闭');
            })
        }
    });
});

producer.on('error', function (err) {
    console.log('error', err);
});
