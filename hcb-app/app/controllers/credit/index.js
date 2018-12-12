const lib = require('./../../../lib');
const base = require('./../../../config/map/quota_query');
const quota = require('./../quota');
const quotaDAL = require('./../quota/DAL');

module.exports = {
    isLaunch: async (req, res, next) => {
        let item = lib.sources(req.body, base);
        let backRes = {
            code: 9,
            msg: '',
            json: {}
        };
        try {
            let result = await quota.isLaunchCredit(item);
            backRes.json.is_can_credit = !!result ? 1 : 2;
            backRes.code = 0;
        } catch (e) {
            backRes.code = 9;
            backRes.msg = e.message;
        }
        return res.json(backRes);
    }
}