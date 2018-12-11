/**
 * Created by lingxi on 2018/1/30.
 */
const Promise = require('bluebird');
const moment = require('moment');
async function start() {
    for (let i = 0; i < 10000000; i++) {
        await Promise.delay(1000);
        console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
    }
}
start()

