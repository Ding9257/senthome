module.exports = function(sequelize, DataTypes) {
    let qb_parameter = sequelize.define('qb_parameter', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键'
        },
        paramName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '参数名'
        },
        paramValue: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: '参数值'
        },
        paramFlag: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '参数类型'
        },
        paramDate: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '参数时间'
        },
        paramStatus: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '状态1.正常，-1 失效'
        },
        fromip: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: '用户ip'
        },
        firstfrom: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            comment: ''
        },
        firstad: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: ''
        },
        vailCount: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0',
            comment: '验证次数'
        },
        deviceUUID: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: ''
        },
        serialId: {
            type: DataTypes.STRING(60),
            allowNull: true,
            comment: ''
        },
        isVoice: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0',
            comment: '是否是语音验证码 1：是0：否'
        },
        bankcardno: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: ''
        }
    });
    return qb_parameter;
}