module.exports = function(sequelize, DataTypes) {
    let qb_company = sequelize.define('qb_company', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '对应qb_users主键'
        },
        customkey: {
            type: DataTypes.STRING(255),
            allowNull: true,
            unique: true,
            comment: '渠道商唯一标识'
        },
        companyName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '公司名称'
        },
        egalPerson: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '法人'
        },
        egalPersonCertNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '法人代表身份证号'
        },
        contactor: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '联系人'
        },
        contactorMobile: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '联系人手机号'
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '邮箱'
        },
        socialCreditCode: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '社会信用代码'
        },
        expiresEnd: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '证件有效期（营业执照）'
        },
        certOrganization: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '发证机关（营业执照）'
        },
        contactorAddress: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '联系地址'
        },
        taxRegisterNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '税务登记号'
        },
        businessLicenseNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '营业执照号'
        },
        cardNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '对公账号'
        },
        bankNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '对公账号银行编号'
        },
        bankName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '对公账号银行名称'
        },
        bankCardProvince: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '开户所在省'
        },
        bankCardCity: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '开户所在市'
        },
        businessLicenceImg: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '营业执照扫描件路径'
        },
        identityImg: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '身份证扫描件'
        },
        openingPermitsImg: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '开户许可证'
        },
        creatTime: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '创建时间'
        },
        letterOfAuthorizationImg: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '合作企业开户授权委托'
        },
        proxyIdentityImg: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '代理人身份证'
        },
        bankCardPhoneNO: {
            type: DataTypes.STRING(11),
            allowNull: true,
            comment: '银行预留手机号'
        },
        callBackUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '开户回调地址'
        },
        signAccount: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        serviceRate: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '基础费率'
        },
        status: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '1',
            comment: '1 启用  2 未启用 3 停用'
        },
        prov: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '省份'
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '城市'
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '地址'
        },
        bankCode: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '银企直联服务CODE'
        },
        customType: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '账户类型：1 商户 2 下发公司 3 代理商'
        }
    });
    return qb_company;
}