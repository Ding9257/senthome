const moment = require('moment')

module.exports = function (sequelize, DataTypes) {
    let hcb_credit_middle = sequelize.define('hcb_credit_middle', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        apply_no: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '进件编号'
        },
        product_id: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '产品id'
        },
        company_id: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '企业编号'
        },
        create_time: {
            type: DataTypes.STRING(15),
            allowNull: true,
            comment: '创建时间'
        },
        app_id: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '渠道号'
        },
        msg: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '打回原因'
        },
        status: {
            type: DataTypes.STRING(10),
            allowNull: true,
            comment: '状态  3打回 有null情况'
        },
        approve_time: {
            type: DataTypes.STRING(15),
            allowNull: true,
            comment: '打回操作时间'
        }
    }, {
        hooks: {
            beforeCreate: (model) => {
                model.create_time = (new Date()).valueOf();
            }
        },
        getterMethods: {
            approve_time_format() {
                if (this.getDataValue('approve_time')) return moment(+this.getDataValue('approve_time')).format('YYYY-MM-DD HH:mm:ss')
            },
            create_time_format() {
                if (this.getDataValue('create_time')) return moment(+this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss')
            }
        }
    });
    return hcb_credit_middle;
}