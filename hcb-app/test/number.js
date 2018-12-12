const model = require('./../app/modules');
const hcb_car_detail = model.hcb_car_detail;
const hcb_etc_turnover = model.hcb_etc_turnover;

async function getnumber() {
    let num = await  hcb_etc_turnover.count({
        where: {},
        col:'in_time',
        distinct:true,
        group:'hcb_etc_turnover.etc_no',
        include: [
            {
                model: hcb_car_detail,
                where: {
                    org_code: '123456789'
                }
            }
        ]
    });
    console.log(num);
}
getnumber()
