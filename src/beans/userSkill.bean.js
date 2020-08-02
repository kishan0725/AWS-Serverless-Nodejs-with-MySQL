module.exports = (sequelize, DataTypes) => {
    const UserSkill = sequelize.define("user_skill", {
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                tableName: 'users',
            },
            key: 'id'
        },
        skill_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                tableName: 'skills',
            },
            key: 'id'
        }
    },
    {
        sequelize,
        underscored: true,
        tableName: 'user_skill'
    });
  
    return UserSkill;
  };