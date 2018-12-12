/**
 * product_id
 * Created by lingxi on 2018/2/7.
 */
const models = require('./../../modules');
const com_level = models.com_level;
module.exports = {
    findOne: (param = {}) => {
        let where = param.where || {};
        return com_level.findOne({
            where
        })
    }
}