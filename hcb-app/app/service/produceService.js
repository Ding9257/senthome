const kafka = require('kafka-node');
const kafka_config = require('./../../config/system').kafka;
const HighLevelProducer = kafka.HighLevelProducer;
const Client = kafka.Client;

const log = require('./../../lib/log');
const producer_log = log.getLogger('producer');
const kafka_log = log.getLogger('kafka');

module.exports = {
    produce(params = {}, topic) {
        let client = new Client(kafka_config.clientHost);
        let producer = new HighLevelProducer(client);
        params = JSON.stringify(params);
        return new Promise((res, rej) => {
            producer.on('ready', function () {
                producer.send([{topic: topic, messages: params}], function (err, data) {
                    if (err) {
                        console.log('生产者错误：', err);
                        rej(err);
                    } else {
                        producer_log.info(params);
                        client.close();
                        res(data);
                    }
                });
            });
            producer.on('error', function (err) {
                console.log(err);
                rej(err);
            });
        }).catch(e => {
            console.log(e);
            kafka_log.error(e.message);
            return Promise.reject(e);
        });
    }
}
