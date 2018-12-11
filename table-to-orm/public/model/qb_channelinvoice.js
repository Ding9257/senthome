module.exports = function(sequelize, DataTypes) {
    let qb_channelinvoice = sequelize.define('qb_channelinvoice', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        createtime: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        amount: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        ordername: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        orderno: {
            type: DataTypes.STRING(40),
            allowNull: true,
            comment: ''
        },
        reCustomkey: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: ''
        },
        customkey: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: ''
        },
        updatetime: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        openCompany: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        companyId: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        invoiceCompanyName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        invoiceNo: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: ''
        },
        invoiceNum: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '发票号'
        },
        status: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: '0',
            comment: '0 待确认   1 确认   2 被驳回'
        },
        operatorName: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: ''
        },
        remark: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: ''
        },
        receiverName: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        mobileNo: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: ''
        },
        bankMessage: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        invoiceType: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            comment: ''
        },
        taxpayerType: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            comment: ''
        },
        num: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            comment: ''
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        courierCompany: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '快递公司'
        },
        bankNameAndBankNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        courierNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        }
    });
    return qb_channelinvoice;
}