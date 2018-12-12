/**
 * Created by lingxi on 2017/12/29.
 */
const uuidV1 = require('uuid/v1');
const lib = require('./../lib');
console.log(parseInt(Math.random()*100));
let obj = {
    company_name:'企业法定名',
    org_code:'12345678987456',
    reg_amt:'100',
    create_date:'2018-02-01',
    real_address:'呼家楼',
    biz_type:'仅零担',
    car_brand:'国产',
    has_storage:'1',
    has_park:'1',
    total_car_quantity:'100',
    own_car_quantity:'50',
    other_car_quantity:'10',
    loan_car_quantity:'20',
    avg_m_etc_amt:'55',
    avg_m_oil_amt:'20',
    main_ops:'0'
};
console.log(uuidV1());
console.log(uuidV1());
console.log(uuidV1());
console.log(uuidV1());
