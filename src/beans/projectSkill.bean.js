/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project_skill', {
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'project',
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
          tableName: 'skill',
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
