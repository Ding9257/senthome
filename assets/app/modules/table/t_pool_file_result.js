module.exports = function (sequelize, DataTypes) {
    let t_pool_file_result = sequelize.define('t_pool_file_result', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        pool_file_id: {type: DataTypes.INTEGER(11), allowNull: true, comment: 't_pool_file表的id'},
        contract_no: {type: DataTypes.STRING(15), allowNull: true, comment: '借款合同编号'},
        item_code: {type: DataTypes.STRING(6), allowNull: true, comment: '返回结果状态码'},
        item_msg: {type: DataTypes.INTEGER(11), allowNull: true, comment: '结果描述'}
    });
    return t_pool_file_result;
}