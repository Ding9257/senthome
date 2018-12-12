/**
 * Created by lingxi on 2017/12/29.
 */
const lib = require('./../lib');
// let obj = {
//     name: '11',
//     age: 20
// }
// let arr = ['key'];
// console.log(lib.isObjInProperty(obj, arr));
let obj = {
    batchId: 'B20171218001',
    orderNo: 'K2016010422704',
    supplierId: 'K2016010422704',
    supplierCompanyName: '108772',
    tradingCompanyId: '108772',
    tradingCompanyName: '108772',
    orderCreateTime: '2016-01-04 00:00:00',
    orderType: '自营',
    Receivable: '89900',
    orderStatus: '履约完成',
    transStatus: '未确认',
    deliveryType: '快塑配送',
    isLoan: '不是',
    loanType: '款到发货',
    signType: 'MD5'
}
let sign = lib.threeMD5Sing(obj,obj.orderNo)
console.log(sign);