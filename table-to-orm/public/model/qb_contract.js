module.exports = function(sequelize, DataTypes) {
    let qb_contract = sequelize.define('qb_contract', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        customkey: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
            comment: '下发公司标识'
        },
        status: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '1',
            comment: '1 启用  2 未启用 3 停用 4弃用'
        },
        priviewUrl: {
            type: DataTypes.LONGTEXT,
            allowNull: true,
            comment: ''
        },
        lable: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        },
        contractId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '合同ID -- 上上签 平台获取'
        },
        templateId: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '模板id'
        },
        templateName: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '模板名称'
        },
        templateType: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '模板类型'
        },
        createTime: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '创建时间'
        },
        enableTime: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '启用时间'
        },
        operatingTime: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '操作时间'
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '合同文件名称（带后缀）'
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '合同标题'
        },
        pages: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '签约印章在第几页'
        }
    });
    return qb_contract;
}