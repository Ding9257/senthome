const sidebarText = '贷款管理';
const hcb_loan_apply = require('../../modules').hcb_loan_apply;
const com_base = require('../../modules').com_base;

module.exports = {
    list: async (req, res, next) => {
        let current = !!req.query.current ? +req.query.current : 1;
        let page_num = req.query.page_num || 10;
        let company_name = req.query.company_name || '';
        let whereBase = !!company_name ? {company_name: {$like: `%${req.query.company_name}%`}} : '';
        let data = await hcb_loan_apply.findAndCountAll({
            offset: (+current - 1) * page_num, limit: +page_num,
            include: [
                {
                    model: com_base,
                    where: whereBase
                }
            ]
        });
        let pageList = {
            pages: Math.ceil(data.count / page_num),
            current: current,
            total: data.count,
            url: '/apply/list',
            tab: `?company_name=${company_name}`
        }
        return res.render('apply/list', {
            sidebarText,
            query: req.query,
            pageList,
            data
        })
    },
    put: async (req, res, next) => {
        let id;

        id = req.params.id;

        let apply = await hcb_loan_apply.findById(id);

        if (!apply) return next();
        if (req.method == 'GET') {
            apply = apply.toJSON()
            apply.sidebarText = sidebarText
            res.render('apply/detail', apply)
        } else if (req.method == 'POST') {
            try {
                apply = await apply.update(req.body);
                res.redirect('/apply/list')
            } catch (e) {
                res.redirect(req.url)
            }
        }
    },
    detail: async (req, res, next) => {
        let loan_id = req.params.loanid;
        return res.render('apply/detail', {
            sidebarText
        });
    }
}