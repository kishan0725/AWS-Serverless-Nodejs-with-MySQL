module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resource_allocated', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'users',
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
          tableName: 'projects',
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
      allowNull: false,
      values: [0,1],
      defaultValue: 1
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    sequelize,
    underscored: true,
    tableName: 'resource_allocated'
  });
};
