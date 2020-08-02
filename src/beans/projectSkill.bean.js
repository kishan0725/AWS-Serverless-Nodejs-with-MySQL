module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_skill', {
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'projects',
        },
        key: 'id'
      }
    },
    skill_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'skills',
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    underscored: true,
    tableName: 'project_skill'
  });
};
