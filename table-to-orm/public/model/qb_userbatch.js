module.exports = function(sequelize, DataTypes) {
    let qb_userbatch = sequelize.define('qb_userbatch', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        createTime: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: ''
        },
        batchId: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: ''
        },
        passNum: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            comment: ''
        },
        batchNum: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            comment: ''
        },
        errorNum: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            comment: ''
        },
        customkey: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: ''
        }
    });
    return qb_userbatch;
}