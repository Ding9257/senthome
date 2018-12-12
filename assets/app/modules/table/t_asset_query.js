module.exports = function (sequelize, DataTypes) {
    let t_asset_query = sequelize.define('t_asset_query', {
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
        version: {type: DataTypes.STRING(15), allowNull: true, comment: '版本号'},
        avl_assets: {type: DataTypes.FLOAT, allowNull: true, comment: '可用资产'},
        rmng_avl_assets: {type: DataTypes.FLOAT, allowNull: true, comment: '剩余资产'}
    });
    return t_asset_query;
}