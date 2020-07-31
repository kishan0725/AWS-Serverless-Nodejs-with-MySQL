/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resource_allocated', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'user',
        },
        key: 'id'
      }
    },
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
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    is_active: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    tableName: 'resource_allocated'
  });
};
