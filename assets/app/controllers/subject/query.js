const Subject = require('../../modules').t_subject;
let query;
const page_num = 10;

module.exports = query = {
  list: async (req) => {
    let where, offset;
    // params:  current(>=0),  orderId 可选;
    if (req.current) offset = (+req.current-1) * page_num;
    where = {};
    ['orderId'].forEach((item) => {
      if (req[item]) where[item] = {'$like': `%${req[item]}%`}
    })
    let x = await Subject.findAndCountAll({
      where,
      offset,
      limit: page_num
    })
    x.pageCount = Math.ceil(x.count / page_num)
    return x;
  },
  detail: async (req) => {
    let id;

    id = req.id;
    if (!id) throw new Error('parameter id does not exist')

    return await Subject.findById(id)
  },
  edit: async (req) => {
    let id;

    id = req.id;

    if (!id) throw new Error('parameter id does not exist');

    let subject = await Subject.findById(id)
    return await subject.update(req)
  }
}

// query.detail({id:1}).then(x=>{console.log(x)})
// query.edit({id:1,creditor:'红石榴'}).then(x=>{console.log(x)})