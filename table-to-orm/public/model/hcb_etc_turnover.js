module.exports = function(sequelize, DataTypes) {
    let hcb_etc_turnover = sequelize.define('hcb_etc_turnover', {
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        etc_no: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: 'ETC卡号'
        },
        xiaofei_date: {
            type: DataTypes.STRING(40),
            allowNull: true,
            defaultValue: '',
            comment: '消费日期'
        },
        service: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: '',
            comment: '服务方'
        },
        in: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '入站'
        },
        in_time: {
            type: DataTypes.STRING(40),
            allowNull: false,
            comment: '入站时间'
        },
        out: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: '出站'
        },
        out_time: {
            type: DataTypes.STRING(40),
            allowNull: false,
            comment: '出站时间'
        },
        record_time: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: '记录上报时间'
        },
        amt: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            comment: '消费金额'
        },
        balance: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            comment: '消费余额'
        }
    });
    return hcb_etc_turnover;
}