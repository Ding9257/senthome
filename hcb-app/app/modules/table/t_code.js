module.exports = function(sequelize, DataTypes) {
    let t_code = sequelize.define('t_code', {
        id: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: ''
        },
        code_key_cd: {
            type: DataTypes.STRING(40),
            allowNull: false,
            comment: '代码编号'
        },
        code_type_cd: {
            type: DataTypes.STRING(40),
            allowNull: false,
            comment: '代码类型编号'
        },
        code_value: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '代码值'
        },
        code_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '代码名称'
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: '含义说明'
        }
    });
    return t_code;
}