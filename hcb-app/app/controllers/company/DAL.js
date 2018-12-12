/**
 * Created by lingxi on 2018/2/5.
 */
const modules = require('./../../modules');
const client = modules.client;
const com_base = modules.com_base;
const com_person = modules.com_person;
const hcb_com_car = modules.hcb_com_car;
const hcb_additional = modules.hcb_additional;
const com_additional = modules.com_additional;
const com_fin = modules.com_fin;
const hcb_annex = modules.hcb_annex;
const hcb_supplement_info = modules.hcb_supplement_info;
const com_quota = modules.com_quota;
const hcb_car_detail = modules.hcb_car_detail;
const hcb_etc_turnover = modules.hcb_etc_turnover;

const log4js = require('./../../../lib/log');
const DBLog = log4js.getLogger('DB');

const include = [com_person, hcb_com_car, hcb_additional, com_additional, com_fin, hcb_annex, hcb_supplement_info].map(item => {
    return {
        model: item
    }
});
module.exports = {
    findAllQuota(param = {}) {
        return this.findAll(param, [{model: com_quota, where: {}, as: 'com_quota'}])
    },
    findAll: (param = {}, models = []) => {
        let where = param.where || {};
        let offset = !!param.current ? (param.current * 1 - 1) * 10 : 0;
        ;
        let limit = 10;
        return com_base.findAndCountAll({
            where,
            include: include.concat(models),
            offset,
            limit
        }).then(data => {
            data.pageCount = Math.ceil(data.count / limit);
            return data;
        });
    },
    findOne: (param = {}) => {
        let where = param.where || {};
        return com_base.findOne({
            where,
            include
        })
    },
    update: (param = {}) => {
        param.legal_person = param.legal_person_name;
        let where = {
            company_id: param.company_id
        };
        return client.transaction(async function (transaction) {
            //企业基本信息
            await com_base.update(param, {where, transaction});

            // 企业-控制人信息  com_person
            await com_person.update(param, {where, transaction});

            // 货车帮-车辆信息 hcb_com_car
            await hcb_com_car.update(param, {where, transaction});

            // 货车帮-附加信息 hcb_additional
            await hcb_additional.update(param, {where, transaction});

            // 企业-附加信息 com_additional
            await com_additional.update(param, {where, transaction});

            //企业-附加信息 com_fin
            await com_fin.update(param, {where, transaction});

            //货车帮补录信息
            await hcb_supplement_info.update(param, {where, transaction});
        }).catch(err => {
            console.log(err.message);
            DBLog.error(err);
            return Promise.reject(err);
        });
    },
    async findCreditInfo(company_id) {
        let company = await com_base.findOne({where: {company_id}, attributes: ['create_date', 'org_code']});
        if (!company) return Promise.reject('NO_COMPANY_FOUND');
        let {create_date, org_code} = company.toJSON();
        create_date = create_date.replace(/年|月|日/g, '-');
        create_date = new Date(create_date);
        let current = new Date();
        let base_date = Math.floor(current.getFullYear() - create_date.getFullYear() + (current.getDate() - create_date.getDate()) / 366)
        let [car_count, sum_and_count] = await  Promise.all([hcb_car_detail.count({
            where: {org_code},
            include: {
                model: hcb_etc_turnover,
                attributes: ['id'],
                where: {id: {$not: null}}
            },
            distinct: true,
            col: 'car_no'
        }),
            hcb_etc_turnover.count({
                distinct:true,
                col:'in_time',
                group: ['hcb_car_detail.car_no'],
                include: [
                    {
                        model: hcb_car_detail,
                        where: {
                            org_code,
                        },
                    },
                ],
                attributes:[
                    [modules.client.literal('sum(amt)'),'sum']
                ],
                where:{
                    in_time: {$gt: `${current.getFullYear() - 1}-${current.getMonth() + 1}-${current.getDate()}`}
                }
            })
        ]);

        if(!car_count)return Promise.reject('no car speed');

        // 车均消费天数

        let car_avg_day = sum_and_count.reduce((pre,cur,index,arr)=>{
           return pre+ cur.count;
        },0)/car_count;

        // 日均消费金额

        let day_avg_amt = sum_and_count.reduce((pre,cur,index,arr)=>{
            return pre +cur.sum/cur.count;
        },0);
        return {car_avg_day,day_avg_amt,base_date,car_count}
    }
}

