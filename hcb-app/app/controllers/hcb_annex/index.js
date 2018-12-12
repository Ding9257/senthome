/**
 * Created by lingxi on 2018/2/9.
 */
const lib = require('./../../../lib');
const DAL = require('./DAL');
module.exports = {
    //处理数组为字符串
    arrayToString: (param = {}) => {
        param.g9 = lib.typeof(param.g9) === 'array' ? param.g9.length ? param.g9.join(',') : '' : param.g9;
        param.g10 = lib.typeof(param.g10) === 'array' ? param.g10.length ? param.g10.join(',') : '' : param.g10;
        param.g8 = lib.typeof(param.g8) === 'array' ? param.g8.length ? param.g8.join(',') : '' : param.g8;
        param.g7 = lib.typeof(param.g7) === 'array' ? param.g7.length ? param.g7.join(',') : '' : param.g7;
        param.b1 = lib.typeof(param.b1) === 'array' ? param.b1.length ? param.b1.join(',') : '' : param.b1;
        param.i11 = lib.typeof(param.i11) === 'array' ? param.i11.length ? param.i11.join(',') : '' : param.i11;
        param.g2 = lib.typeof(param.g2) === 'array' ? param.g2.length ? param.g2.join(',') : '' : param.g2;
        param.g11 = lib.typeof(param.g11) === 'array' ? param.g11.length ? param.g11.join(',') : '' : param.g11;
        param.L9 = lib.typeof(param.L9) === 'array' ? param.L9.length ? param.L9.join(',') : '' : param.L9;
        param.L10 = lib.typeof(param.L10) === 'array' ? param.L10.length ? param.L10.join(',') : '' : param.L10;
        param.L11 = lib.typeof(param.L11) === 'array' ? param.L11.length ? param.L11.join(',') : '' : param.L11;
        param.L12 = lib.typeof(param.L12) === 'array' ? param.L12.length ? param.L12.join(',') : '' : param.L12;
        param.L6 = lib.typeof(param.L6) === 'array' ? param.L6.length ? param.L6.join(',') : '' : param.L6;
        param.g3 = lib.typeof(param.g3) === 'array' ? param.g3.length ? param.g3.join(',') : '' : param.g3;
        param.g12 = lib.typeof(param.g12) === 'array' ? param.g12.length ? param.g12.join(',') : '' : param.g12;
        param.g13 = lib.typeof(param.g13) === 'array' ? param.g13.length ? param.g13.join(',') : '' : param.g13;
        param.g14 = lib.typeof(param.g14) === 'array' ? param.g14.length ? param.g14.join(',') : '' : param.g14;
        param.g15 = lib.typeof(param.g15) === 'array' ? param.g15.length ? param.g15.join(',') : '' : param.g15;
        param.g16 = lib.typeof(param.g16) === 'array' ? param.g16.length ? param.g16.join(',') : '' : param.g16;
        param.g17 = lib.typeof(param.g17) === 'array' ? param.g17.length ? param.g17.join(',') : '' : param.g17;
        param.g181 = lib.typeof(param.g181) === 'array' ? param.g181.length ? param.g181.join(',') : '' : param.g181;
        param.g182 = lib.typeof(param.g182) === 'array' ? param.g182.length ? param.g182.join(',') : '' : param.g182;
        param.g19 = lib.typeof(param.g19) === 'array' ? param.g19.length ? param.g19.join(',') : '' : param.g19;
        param.g20 = lib.typeof(param.g20) === 'array' ? param.g20.length ? param.g20.join(',') : '' : param.g20;
        param.g21 = lib.typeof(param.g21) === 'array' ? param.g21.length ? param.g21.join(',') : '' : param.g21;
        return param;
    },
    query: async (req, res, next) => {
        let fields = [
            {name: 'g9', desc: '营业执照'},
            {name: 'g10', desc: '组织机构代码证'},
            {name: 'g8', desc: '税务登记证'},
            {name: 'g7', desc: '道路运输经营许可证'},
            {name: 'b1', desc: '法人及实际控制人身份证'},
            {name: 'i11', desc: '行驶证'},
            {name: 'g2', desc: '经营场地租赁合同/房产证明'},
            {name: 'g11', desc: '近2年水电缴费凭证'},
            {name: 'L9', desc: '借款业务申请表'},
            {name: 'L10', desc: '企业征信报告'},
            {name: 'L11', desc: '法人及实际控制人征信报告'},
            {name: 'L12', desc: '法人及实际控制人担保函'},
            {name: 'L6', desc: '企业授信授权书'},
            {name: 'g3', desc: '企业近12个月银行流水'},
            {name: 'g12', desc: '前三大客户运输合同'},
            {name: 'g13', desc: '商业险保单'},
            {name: 'g14', desc: '运输挂靠协议'},
            {name: 'g15', desc: '内部环境办公室'},
            {name: 'g16', desc: '外部环境'},
            {name: 'g17', desc: '经营相关：运输车辆'},
            {name: 'g181', desc: '客户办公照'},
            {name: 'g182', desc: '客户手持服务合同与渠道人员合照'},
            {name: 'g19', desc: '企业近6个月增值税纳税单'},
            {name: 'g20', desc: '最近3年财务报表'},
            {name: 'g21', desc: '最近3年审计报告'}
        ]
        let id = req.params.id;
        let data = await DAL.findOne({
            where: {
                id
            }
        });
        return res.render('company/imageInfo', {
            data,
            fields,
            sidebarText: '企业信息'
        })
    }
}