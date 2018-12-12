/**
 * Created by lingxi on 2017/12/25.
 */
const NODE_ENV = process.env.NODE_ENV;
console.log('NODE_ENV:', NODE_ENV);
module.exports = {
    sys: require('./sys-setting'),
    DB: NODE_ENV === 'production' ? require('./../prod/DB-setting') : NODE_ENV === 'test' ? require('./../test/DB-setting') : require('./../dev/DB-setting'),
    kafka: NODE_ENV === 'production' ? require('./../prod/kafka') : NODE_ENV === 'test' ? require('./../test/kafka') : require('./../dev/kafka'),
    rule: require('./rule'),
    credit: require('./credit')
}