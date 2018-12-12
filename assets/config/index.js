/**
 * Created by lingxi on 2017/12/25.
 */
module.exports = {
    sys: require('./sys-setting'),
    assets: process.env.NODE_ENV === 'production' ? require('./prod/assets-setting') : require('./assets-setting'),
    fast: process.env.NODE_ENV === 'production' ? require('./prod/fast-setting') : require('./fast-setting'),
    order: require('./order-setting'),
    DB: process.env.NODE_ENV === 'production' ? require('./prod/prod-DB-setting') : require('./DB-setting'),
    uploadFile: require('./file-setting'),
    batch: require('./batch-setting')
}