module.exports = function (sequelize, DataTypes) {
    let com_quota = sequelize.define('com_quota', {
        id: {
            type: DataTypes.BIGINT(255),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '额度编号'
        },
        quota_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '额度ID'
        },
        company_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: '企业ID'
        },
        product_id: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '产品ID'
        },
        partner_id: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '合作商ID'
        },
        business_type: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '业务品种'
        },
        currency: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '币种'
        },
        freezen_status: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            defaultValue: '5',
            comment: '额度状态5-批准 1 -冻结 2-终止 3-过期 4-待授信 6-未授信',
            get() {
                if (this.getDataValue('freezen_status') != 3 && this.getDataValue('credit_apply_expire_time') && this.getDataValue('credit_apply_expire_time') < Date.now()) {
                    this.update({freezen_status: 3});
                    return 3;
                }
                return this.getDataValue('freezen_status')
            }
        },
        system_credit_date: {
            type: DataTypes.STRING(32),
            allowNull: true,
            comment: '系统评估额度日期'
        },
        sys_credit: {
            type: DataTypes.BIGINT(20),
            allowNull: true,
            comment: '系统评估额度'
        },
        last_credit_date: {
            type: DataTypes.STRING(32),
            allowNull: true,
            comment: '最后授信审批日期'
        },
        approved_sum: {
            type: DataTypes.BIGINT(20),
            allowNull: true,
            comment: '批准额度'
        },
        already_used_amount: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            defaultValue: '0',
            comment: '已用额度'
        },
        available_credit: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            defaultValue: '0',
            comment: '可用额度'
        },
        freezing_amount: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            defaultValue: '0',
            comment: '冻结金额'
        },
        credit_apply_create_time: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '授信开始日期'
        },
        credit_apply_expire_time: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '授信终止日期'
        },
        is_loop: {
            type: DataTypes.STRING(1),
            allowNull: true,
            comment: '是否循环使用'
        },
        cycle: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '周期单位'
        },
        cycle_num: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '周日'
        },
        is_approval: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: '1',
            comment: '是否额度审批中 1审批中 2审批完'
        }
    }, {
        associate: function (models) {
            com_quota.belongsTo(models.com_base, {
                foreignKey: 'company_id',
                targetKey: 'company_id'
            });
            com_quota.belongsTo(models.com_level, {
                foreignKey: 'company_id',
                targetKey: 'company_id'
            });
            com_quota.belongsTo(models.com_quota_additional, {
                foreignKey: 'company_id',
                targetKey: 'company_id'
            });
        }
    });
    return com_quota;
}