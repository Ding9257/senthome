module.exports = function(sequelize, DataTypes) {
    let t_instruction_repository_sequence_m0000 = sequelize.define('t_instruction_repository_sequence_m0000', {
        SEQUENCE_NAME: {
            type: DataTypes.STRING(50),
            allowNull: false,
            primaryKey: true,
            comment: '序列名称'
        },
        CURRENT_VAL: {
            type: DataTypes.INTEGER(8),
            allowNull: false,
            comment: '当前值'
        },
        INCREMENT_STEP: {
            type: DataTypes.INTEGER(8),
            allowNull: true,
            defaultValue: '1',
            comment: '递增步长'
        }
    });
    return t_instruction_repository_sequence_m0000;
}