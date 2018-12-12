const models = require('./../../modules');
const hcb_annex = models.hcb_annex;
module.exports = {
    findOne: (param = {}) => {
        let where = param.where || {};
        return hcb_annex.findOne({
            where
        })
    }
}