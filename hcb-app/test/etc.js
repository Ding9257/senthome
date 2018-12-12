/**
 * Created by lingxi on 2018/2/5.
 */
const kafka = require('kafka-node');
const kafka_config = require('./../config/system').kafka;
const HighLevelProducer = kafka.HighLevelProducer;
const Client = kafka.Client;
const client = new Client(kafka_config.clientHost);
const topic = kafka_config.topics.ETC;
const producer = new HighLevelProducer(client);

producer.on('ready', function () {
  let obj = {
    etc_no: 'ETC卡号',
    xiaofei_date:  '消费日期',
    car_no:'车牌号',
    balance:  '100',
    in_time:  '入站时间',
    out_time: '出站时间',
    in: '入站名称',
    out:  '出站名称',
    service:  '服务方',
    amt:  '100',
    record_time:  '记录上报时间'

  }
  let info = [
    {topic: topic, messages: JSON.stringify([obj])}
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
