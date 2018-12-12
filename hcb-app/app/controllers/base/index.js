/**
 * Created by lingxi on 2018/2/1.
 */
const DAL = require('./DAL');
module.exports = {
    addOne: async (req, res, next) => {
        console.log(req.body);
        let data = await DAL.addOne(req.body);
        return res.json(data);
    }
}