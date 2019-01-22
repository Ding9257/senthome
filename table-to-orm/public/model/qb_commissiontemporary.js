module.exports = function(sequelize, DataTypes) {
    let qb_commissiontemporary = sequelize.define('qb_commissiontemporary', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        userName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        idCard: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        bankCardNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        bankName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        amount: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        serviceType: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '服务类型'
        },
        price: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '单价'
        },
        number: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '计件'
        },
        documentType: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            comment: '证件类型'
        },
        batchId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        payType: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            comment: ''
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: ''
        },
        bankId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: ''
        },
        bankNo: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: ''
        },
        orderNo: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        status: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            comment: ''
        },
        statusDesc: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        originalId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        companyId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        operatorName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        createTime: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        remark: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        menuId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: ''
        },
        updateTime: {
            type: DataTypes.STRING(55),
            allowNull: true,
            comment: ''
        },
        mobilePhone: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '手机号码'
        },
        serviceRate: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '0',
            comment: '服务费费率'
        },
        serviceFee: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '0.00',
            comment: '服务费'
        }
    });
    return qb_commissiontemporary;
}