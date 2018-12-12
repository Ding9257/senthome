/**
 * Created by lingxi on 2018/2/5.
 */
const kafka = require('kafka-node');
const kafka_config = require('./../config/system').kafka;
const HighLevelProducer = kafka.HighLevelProducer;
const Client = kafka.Client;
const client = new Client(kafka_config.clientHost);
const topic = kafka_config.topics.company;
const producer = new HighLevelProducer(client);

producer.on('ready', function () {
    let obj = {
        data: [{
            result: {
                applyNo: '2222',
                appId: '21',
                cname: '企业法定名称1',
                applyProId: 1111,
                licenseCode: '123456789632587413',
                cAsset: 100000,
                cfromdate: '2018-02-01',
                realOprateAddress: '北京市-朝阳区-呼家楼',
                businessType: '枪支弹药',

                operationAge: '10',
                employeeCount: '100',
                driverCount: '80',
                driverAveAge: '30',
                cooperateStartTime: '2017-10-01',

                juridicalName: '王二麻子',
                realConName: '张三',
                juridicalPhone: '13581735102',
                realConPhone: '1355555555',
                juridicalStake: '80',
                realConStake: '10',
                juridicalIdNum: '147859658415845963',
                realConIdNum: '986574859625845896',
                realConAge: '5',
                realConAddress: '瀚海文化大厦',
                realConMarryType: '已婚',
                realConMateName: '麻子',
                realConMateIdNum: '569584562351478596',
                realConMatePhone: '13987456321',
                realConImmediateName: '网二',
                realConImmediateIdNum: '987458541478596541',
                realConImmediatePhone: '13874561234',
                realConImmediateRelation: '兄弟',
                creditInquiryLevel: '低级',

                truckBrand: '进口',
                existStorage: '有',
                existParking: '有',
                allCount: '520',
                ownCount: '120',
                subjectionCount: '120',
                havaLoanCount: '50',
                aveTrafficCost: '20.2',
                aveOilCost: '12.2',
                isCoreCarrier: '是',

                placeNature: '自有',
                annualRent: '100',
                OperatMode: '干线',
                OperatModeDesc: '',
                businessArea: '省内配送',
                isCoreCarrier: '',
                isRegisterBrand: '是',
                brandName: '品牌名称',
                registrationMark: '345345',
                cTelephone: '010555555',
                juridicalAdress: '大北看守所',

                cBankName: '中国工商银行',
                cBankCard: '62684806484654125',
                financeChiefName: '诸葛桑',
                financeChiefPhone: '13584569654',
                financeChiefAdress: '第一看守所',
                manageBankroll: '1',
                manageLoanAmount: '1000',
                creditInquiryLevel: '1',
                monthReceivable: '50',
                monthReceivableDays: '20',
                monthPayable: '10',
                monthPayableDays: '7',

                g9: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519376486904&di=c5f8de82d1c89cf552788182f901fe7d&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201509%2F04%2F20150904124544_cEhj8.thumb.700_0.jpeg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519376486904&di=ac8e4b63bb1ffc067f330e50cd1df7d4&imgtype=0&src=http%3A%2F%2Feasyread.ph.126.net%2FRBBIGw451S58r9zy3doD4Q%3D%3D%2F7916764095453329101.jpg'],
                g10: ['3'],
                g8: ['1'],
                g7: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519376486904&di=3552c4bcf83576492dfd0e7c959b823e&imgtype=0&src=http%3A%2F%2Fimg4q.duitang.com%2Fuploads%2Fitem%2F201502%2F02%2F20150202001548_hV3Lx.png', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519376486903&di=57e19d223d6b5bef8f7787b5acc353bb&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201504%2F17%2F20150417H4701_4PsyC.thumb.700_0.jpeg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519376486902&di=4182da0719a0caea7a333747af5834d4&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201506%2F17%2F20150617212802_nGFkJ.jpeg'],
                b1: ['1'],
                i11: ['1'],
                g2: ['1'],
                g11: ['1'],
                l9: ['1'],
                l10: ['1'],
                l11: ['1'],
                l12: ['1'],
                l6: ['1'],
                g3: ['1'],
                g12: ['1'],
                g13: ['1'],
                g14: ['1'],
                g15: ['1'],
                g16: ['1'],
                g17: ['1'],
                g181: ['1'],
                g182: ['1'],
                g19: ['1'],
                g20: ['1'],
                g21: ['1']

            },
            typeCode: '1101020'
        }]
    };

    let info = [
        {topic: topic, messages: JSON.stringify(obj)}
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
