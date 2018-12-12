module.exports = function(sequelize, DataTypes) {
    let hcb_annex = sequelize.define('hcb_annex', {
        id: {
            type: DataTypes.BIGINT(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        company_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            defaultValue: '',
            comment: ''
        },
        g9: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '营业执照'
        },
        g10: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '组织机构代码证'
        },
        g8: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '税务登记证'
        },
        g7: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '道路运输经营许可证'
        },
        b1: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '法人及实际控制人身份证'
        },
        i11: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '行驶证'
        },
        g2: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '经营场地租赁合同/房产证明'
        },
        g11: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '近2年水电缴费凭证'
        },
        L9: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '借款业务申请表'
        },
        L10: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '企业征信报告'
        },
        L11: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '法人及实际控制人征信报告'
        },
        L12: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '法人及实际控制人担保函'
        },
        L6: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '企业授信授权书'
        },
        g3: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '企业近12个月银行流水'
        },
        g12: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '前三大客户运输合同'
        },
        g13: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '商业险保单'
        },
        g14: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '运输挂靠协议'
        },
        g15: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '内部环境办公室'
        },
        g16: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '外部环境：外部环境照片，外访人员与门牌LOGO合影'
        },
        g17: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '经营相关：运输车辆'
        },
        g181: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '现场拍照，客户办公照'
        },
        g182: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '现场拍照，客户手持服务合同与渠道人员合照'
        },
        g19: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '企业近6个月增值税纳税单'
        },
        g20: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '最近3年财务报表'
        },
        g21: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '最近3年审计报告'
        }
    });
    return hcb_annex;
}