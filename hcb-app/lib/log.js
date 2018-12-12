/**
 * Created by lingxi on 2018/1/8.
 */
const lib = require('./index');
const path = require('path');
const log = require('log4js');
// 日志级别 ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK 小写调用即可
log.configure({
    appenders: {
        //快速请求日志
        kafka: {
            type: 'dateFile',
            filename: path.join(process.cwd(), 'public', 'log', 'kafka', 'error'),
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log'
        },
        //企业信息
        base: {
            type: 'dateFile',
            filename: path.join(process.cwd(), 'public', 'log', 'base', 'info'),
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log'
        },
        //请求快速日志
        DB: {
            type: 'dateFile',
            filename: path.join(process.cwd(), 'public', 'log', 'DB', 'error'),
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log'
        },
        // 车辆信息
        car: {
            type: 'dateFile',
            filename: path.join(process.cwd(), 'public', 'log', 'car', 'info'),
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log'
        },
        // etc流水信息
        etc: {
            type: 'dateFile',
            filename: path.join(process.cwd(), 'public', 'log', 'etc', 'info'),
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log'
        },
        // 推送的内容
        producer: {
            type: 'dateFile',
            filename: path.join(process.cwd(), 'public', 'log', 'producer', 'info'),
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log'
        },
        //借款申请信息
        loanApply:{
            type: 'dateFile',
            filename: path.join(process.cwd(), 'public', 'log', 'loanApply', 'info'),
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log'
        }
    },
    categories: {
        default: {
            appenders: ['kafka'],
            level: 'error'
        },
        kafka: {
            appenders: ['kafka'],
            level: 'error'
        },
        base: {
            appenders: ['base'],
            level: 'info'
        },
        DB: {
            appenders: ['DB'],
            level: 'error'
        },
        car: {
            appenders: ['car'],
            level: 'info'
        },
        etc: {
            appenders: ['etc'],
            level: 'info'
        },
        producer: {
            appenders: ['producer'],
            level: 'info'
        },
        loanApply:{
            appenders: ['loanApply'],
            level: 'info'
        }
    }
});
module.exports = log;
