module.exports = function (sequelize, DataTypes) {
    let t_pool_file = sequelize.define('t_pool_file', {
        id: {type: DataTypes.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true, comment: ''},
        fileName: {type: DataTypes.STRING(255), allowNull: true, comment: '文件名'},
        message: {type: DataTypes.STRING(10), allowNull: true, comment: '返回信息描述'}
    });
    return t_pool_file;
}