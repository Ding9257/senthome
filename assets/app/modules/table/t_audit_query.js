module.exports = function (sequelize, DataTypes) {
    let t_audit_query = sequelize.define('t_audit_query', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
         queryDt: {type: DataTypes.DATE, allowNull: true, comment: '查询时间'},
        platNo: {type: DataTypes.STRING(15), allowNull: true, comment: '平台商户编号'},
        listing_no: {type: DataTypes.STRING(127), allowNull: true, comment: '挂牌编号'},
        contract_no: {type: DataTypes.STRING(15), allowNull: true, comment: '借款合同编号'},
        audit_code: {type: DataTypes.STRING(15), allowNull: true, comment: '审核结果'},
        audit_dt: {type: DataTypes.DATE, allowNull: true, comment: '审核时间'}
    });
    return t_audit_query;
}