module.exports = function(sequelize, DataTypes) {
    let channel_custom = sequelize.define('channel_custom', {
        id: {
            type: DataTypes.INTEGER(20).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键'
        },
        companyName: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '公司名称'
        },
        enabled: {
            type: DataTypes.TINYINT(4),
            allowNull: true,
            defaultValue: '1',
            comment: '0代表禁用，1代表启用  -2注销'
        },
        customkey: {
            type: DataTypes.STRING(40),
            allowNull: true,
            unique: true,
            comment: '渠道商唯一标识'
        },
        customType: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '账户类型：1 商户 2 下发公司 3 代理商 4管理员'
        },
        bankcardno: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: ''
        },
        secretkey: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: '秘钥'
        },
        creatTime: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '注册时间'
        },
        phoneNo: {
            type: DataTypes.STRING(40),
            allowNull: false,
            primaryKey: true,
            comment: '手机号'
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '邮箱'
        },
        username: {
            type: DataTypes.STRING(40),
            allowNull: true,
            unique: true,
            comment: '用户名'
        },
        tranPassword: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: '交易密码'
        },
        bankname: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '开户行'
        },
        bankNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '账号'
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '服务结束时间'
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '开始服务时间'
        },
        expireTime: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '过期时间'
        },
        AgentId: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: '// 渠道手续费账户余额'
        },
        masterCustom: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: '所属账户'
        },
        receiverName: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: '// 渠道手续费账户余额'
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        bankMessage: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        invoiceType: {
            type: DataTypes.INTEGER(20),
            allowNull: true,
            comment: ''
        },
        taxpayerType: {
            type: DataTypes.INTEGER(20),
            allowNull: true,
            comment: '纳税人类型  1一般纳税人  2小规模'
        },
        companyOpenNotifyUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '// 商户开通通知地址'
        },
        invoiceNo: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: ''
        },
        productNo: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: '// 渠道手续费账户余额'
        },
        addressAndPhone: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '单位地址及电话'
        },
        bankNameAndBankNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '开户行及账号'
        },
        contentList: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '发票内容id集合'
        },
        taxpayerNumber: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '纳税人识别号'
        },
        password: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: '管理密码'
        },
        emitType: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '1',
            comment: '1 先签约 后下发  2 直接下发 '
        }
    });
    return channel_custom;
}