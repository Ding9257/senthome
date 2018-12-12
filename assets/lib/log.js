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
        fast: {
            type: 'dateFile',
            filename: path.join(process.cwd(), 'public', 'log', 'fast'),
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log'
        },
        orderPush:{
            type: 'dateFile',
            filename: path.join(process.cwd(), 'public', 'log', 'orderPush','info'),
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log'
        },
        subjectPush:{
          type: 'dateFile',
          filename: path.join(process.cwd(), 'public', 'log', 'subjectPush','info'),
          alwaysIncludePattern: true,
          pattern: '-yyyy-MM-dd.log'
        },
        //请求快速日志
        orderBack:{
            type: 'dateFile',
            filename: path.join(process.cwd(), 'public', 'log', 'orderBack','info'),
            alwaysIncludePattern: true,
            pattern: '-yyyy-MM-dd.log'
        }
    },
    categories: {
        default: {
            appenders: ['fast'],
            level: 'error'
        },
        fast: {
            appenders: ['fast'],
            level: 'info'
        },
        orderPush:{
            appenders: ['orderPush'],
            level: 'info'
        },
        orderBack:{
            appenders: ['orderBack'],
            level: 'info'
        },
        subjectPush:{
            appenders: ['subjectPush'],
            level: 'info'
        }
    }
});
module.exports = log;
