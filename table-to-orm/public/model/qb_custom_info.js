module.exports = function(sequelize, DataTypes) {
    let qb_custom_info = sequelize.define('qb_custom_info', {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键'
        },
        customkey: {
            type: DataTypes.STRING(30),
            allowNull: true,
            comment: '第三方渠道唯一标识key'
        },
        ip: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: 'ip限制，多数据逗号间隔'
        },
        customlogo: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: '三方logo'
        },
        customname: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: '渠道名称'
        },
        salt: {
            type: DataTypes.STRING(60),
            allowNull: true,
            comment: '盐值'
        },
        customLoginKey: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '渠道登录token的加密字段'
        },
        channelBankNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '渠道银行'
        },
        moduleNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '渠道开通业务代码  '
        },
        channelNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '渠道编码'
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '状态'
        },
        showP2p: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            defaultValue: '0',
            comment: '是否显示固收 1,显示。  0,不显示'
        },
        showFund: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0',
            comment: '是否显示基金 1,显示。  0,不显示'
        },
        showInsurance: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0',
            comment: '是否显示保险 1,显示。  0,不显示'
        },
        companyOpenNotify: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '商户开户成功回调'
        },
        compactNotifyUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '合同通知url（仅限moduleNo=000002）'
        }
    });
    return qb_custom_info;
}