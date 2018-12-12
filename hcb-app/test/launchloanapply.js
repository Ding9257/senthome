/**
 * 发起借款
 * Created by lingxi on 2018/2/11.
 */
const produceService = require('./../app/service/produceService');
const kafkaConfig = require('./../config/system').kafka;

let info ={
    "data": [{
    "result": {
        applyNo: '12341234',
        appId: 234234,
        bidNum: '1232456789',
        applyProId: '6369101454770176',
        licenseCode: 'lic201803053324',
        loanAmount: 10,
        plateNumber: '京A1234',
        etcCard: 'ETC111111111'
    },
    "typeCode": "1101021"
}],
    "reqinfo": null
}

produceService.produce(info, kafkaConfig.topics.loanApply);