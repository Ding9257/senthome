/**
 * Created by lingxi on 2018/1/12.
 */
const nodeXlsx = require('node-xlsx');
const path = require('path');
const t_policy = require('./../../modules').t_policy;
let mod;
let sidebarText = '保单管理';
let page_num = 10;
module.exports = mod = {
    list: async (req, res, next) => {
        let current = req.query.current || 1;
        let where = {};
        ['name'].forEach((item) => {
            if (req.query[item]) where[item] = {'$like': `%${req.query[item]}%`}
        });
        where.states = 1;
        let param = {
            name: req.query.name || ''
        };
        let offset = (current - 1) * page_num;
        let data = await t_policy.findAndCountAll({
            where,
            offset,
            limit: page_num
        });
        data.pageCount = Math.ceil(data.count / page_num);
        let pageList = {
            pages: data.pageCount,
            current: current,
            total: data.count,
            url: '/policy/list',
            tab: `&name=${param.name}`
        }
        return res.render('policy/list', {
            data,
            sidebarText,
            param,
            pageList
        })
    },
    upload: async (req, res, next) => {
        let data = mod.read(req.file.path);
        let arr = data.map(item => {
            return t_policy.create(item);
        })
        Promise.all(arr);
        req.flash('Dialog', {
            title: '成功',
            content: '上传文件成功'
        })
        return res.redirect('/policy/list');
    },
    annexupload: async (req, res, next) => {
        let filename = req.file.originalname;
        let id = req.body.id;
        let file = req.file.filename;
        let data = await t_policy.update({file, filename}, {
            where: {id}
        });
        req.flash('Dialog', {
            title: '成功',
            content: '上传附件成功'
        });
        return res.redirect('/policy/list')
    },
    read: (filePath) => {
        let obj = nodeXlsx.parse(filePath);
        let index = 0;
        obj.forEach((item, index1) => {
            if (item.name == '保单列表') {
                index = index1;
            }
        });
        let arr = obj[index].data.map((item) => {
            return {
                name: item[0],
                quota: item[1]
            }
        });
        return arr.slice(1, arr.length);
    },
    addGet: (req, res, next) => {
        return res.render('policy/add', {
            sidebarText
        });
    },
    addPost: async (req, res, next) => {
        await t_policy.create(req.body)
        req.flash('Dialog', {
            title: '提示',
            content: '添加成功'
        });
        return res.redirect('/policy/list')
    },
    editGet: async (req, res, next) => {
        let policy = await t_policy.findById(req.query.id);
        return res.render('policy/edit', {
            policy,
            sidebarText,
        })
    },
    editPost: async (req, res, next) => {
        await t_policy.update(req.body, {
            where: {
                id: req.body.id
            }
        });
        req.flash('Dialog', {
            title: '提示',
            content: '修改成功'
        });
        return res.redirect('/policy/list')
    },
    disabled: async (req, res, next) => {
        await t_policy.update({states: 2}, {
            where: {
                id: req.query.id
            }
        });
        req.flash('Dialog', {
            title: '提示',
            content: '停用成功'
        });
        return res.redirect('/policy/list');
    }
}