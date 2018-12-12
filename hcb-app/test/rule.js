/**
 * Created by lingxi on 2018/2/7.
 */
const http = require('./../app/service/httpService');

async function start() {
    console.time('rule');
    let url = '/bigloan-client/rule/evalcard';
    let arr = [];
    for (let i = 0; i < 100; i++) {
        let obj = {
            url,
            "sCreditLine": 60000000.0,
            "sNowBalance": "241000.0",
            "sNowPayment": "240000.0",
            "s6AveSalary": "6086.0",
            "sOverdue": "0.0",
            "sRepayment": "0.0",
            "sRepaymentRate": "1.2718333333333334",
            "sSeriesMonth": "5.0",
            "sS12AveSalary": "3043.0",
            "sConsumeRate": "0.12041666666666667"
        }
        arr.push(http.Post(obj));
    }
    try{
        let data = await Promise.all(arr);
        console.log(data);
        console.log(data.length);
        console.timeEnd('rule');
    }
    catch (e){
        console.log(e);
    }

}
start();