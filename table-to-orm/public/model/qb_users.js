module.exports = function(sequelize, DataTypes) {
    let qb_users = sequelize.define('qb_users', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: '主键userId'
        },
        userNo: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '渠道商户用户id'
        },
        userName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '姓名/公司名'
        },
        certId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '用户身份证号码/营业执照号'
        },
        mobilePhone: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '用户手机号'
        },
        account: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '支付宝账号'
        },
        creatTime: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '注册时间'
        },
        merchantId: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '商户id'
        },
        transPassword: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '交易密码是否存在，存在true，不存在false'
        },
        companyType: {
            type: DataTypes.INTEGER(2),
            allowNull: true,
            defaultValue: '1',
            comment: '爱员工商户类型  1 合伙人企业电子账户，其他  2 爱员工电子账户  '
        },
        userType: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '用户类型，1普通 ， 2商户，  0禁用， -1  待激活  11   补全信息    -2待激活商户 3支付宝'
        },
        companyUserNo: {
            type: DataTypes.STRING(11),
            allowNull: true,
            comment: '用户所在企业对应的编号'
        },
        companyName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '公司名称'
        },
        userCertFrontPicture: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '用户身份证照片（正面）'
        },
        remark: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '备注'
        },
        userCertBackPicture: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '用户身份证照片（反面）'
        },
        signType: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0',
            comment: '签约状态； 0 初始状态1 成功，2 失败 '
        },
        wechartId: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: '微信openid'
        },
        batcheId: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '导入批次id'
        },
        documentType: {
            type: DataTypes.INTEGER(2),
            allowNull: true,
            comment: '证件类型'
        },
        pictureStatus: {
            type: DataTypes.INTEGER(255),
            allowNull: true,
            defaultValue: '0',
            comment: '身份证照片上传状态 0 未上传 1 已上传 2 上传失败'
        },
        bankName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '银行名称'
        }
    });
    return qb_users;
}