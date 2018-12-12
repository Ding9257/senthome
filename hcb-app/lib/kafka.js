/**
 * Created by lingxi on 2018/2/1.
 */
const kafka = require('kafka-node');
const kafkaConfig = require('./../config/system').kafka;
const consumers = {};

module.exports = {
    consumer: function (topic) {
        if (!consumers[topic]) {
            let consumerOptions = {
                host: kafkaConfig.clientHost,
                groupId: topic,
                sessionTimeout: 15000,
                protocol: ['roundrobin'],
                fetchMaxBytes: 1024 * 1024 * 1024,
                migrateHLC: true,
                migrateRolling: false
            };
            consumers[topic] = new kafka.ConsumerGroup(consumerOptions, topic);
            consumers[topic].on('error', function () {
                delete consumers[topic];
            });
        }
        return consumers[topic];
    }
}

