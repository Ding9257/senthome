/**
 * Created by lingxi on 2018/2/7.
 */
const models = require('./../../modules');
const hcb_loan_apply = models.hcb_loan_apply;
module.exports = {
    addOne: (param = {}) => {
        return hcb_loan_apply.create(param)
    }
}