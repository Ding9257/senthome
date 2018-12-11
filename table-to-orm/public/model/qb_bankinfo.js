module.exports = function(sequelize, DataTypes) {
    let qb_bankinfo = sequelize.define('qb_bankinfo', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        maxInvestLimit: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: ''
        },
        bankBrhName: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: ''
        },
        todayMaxInvestLimit: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: ''
        },
        bankpic: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: ''
        },
        paytype: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: '支持哪种方式 0,全部支持,1,联动,2，连连'
        },
        bankno: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: ''
        },
        lianlianOrderlimit: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '0',
            comment: '连连单笔限额（-1无限制）'
        },
        lianlianDaylimit: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '0',
            comment: '连连单日限额（-1无限制）'
        },
        lianlianMonthlimit: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '0',
            comment: '连连单月限额（-1无限制）'
        },
        liandongMonthlimit: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '0',
            comment: '联动单月限额（-1无限制）'
        },
        liandongOrderlimit: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '0',
            comment: '联动单笔限额（-1无限制）'
        },
        liandongDaylimit: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: '0',
            comment: '联动单日限额（-1无限制）'
        },
        chinapayMonthlimit: {
            type: DataTypes.STRING(45),
            allowNull: true,
            defaultValue: '0',
            comment: ''
        },
        chinapayOrderlimit: {
            type: DataTypes.STRING(45),
            allowNull: true,
            defaultValue: '0',
            comment: ''
        },
        chinapayDaylimit: {
            type: DataTypes.STRING(45),
            allowNull: true,
            defaultValue: '0',
            comment: ''
        },
        fuyoupayDaylimit: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: '富友单日限额'
        },
        fuyoupayOrderlimit: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: '富友单笔限额'
        },
        fuyoupayMonthlimit: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: '富友单月限额'
        },
        jdpayOrderlimit: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: ''
        },
        jdpayDaylimit: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: ''
        },
        jdpayMonthlimit: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: ''
        },
        shortName: {
            type: DataTypes.STRING(45),
            allowNull: true,
            comment: ''
        },
        priority: {
            type: DataTypes.STRING(30),
            allowNull: true,
            comment: '支付优先级：1连连;5富友'
        }
    });
    return qb_bankinfo;
}