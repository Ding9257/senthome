/**
 * Created by lingxi on 2018/1/12.
 */
module.exports = function (sequelize, DataTypes) {
    let t_policy = sequelize.define('t_policy', {
        id: {type: DataTypes.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true, comment: ''},
        name: {type: DataTypes.STRING(255), allowNull: true, comment: '企业名称'},
        quota: {type: DataTypes.STRING(20), allowNull: true, comment: '保单额度'},
        file: {type: DataTypes.STRING(255), allowNull: true, comment: '文件路径'},
        filename: {type: DataTypes.STRING(255), allowNull: true, comment: '文件名'},
        states: {type: DataTypes.INTEGER(1), allowNull: false, defaultValue: 1, comment: '1可用 2停用'}
    });
    return t_policy;
}