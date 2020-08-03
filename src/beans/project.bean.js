module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projects', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    project_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: {
          tableName: 'clients',
        },
        key: 'id'
      }
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    is_deleted: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      values: [0,1],
      defaultValue: 0
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true
    },
    required_resources: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    is_active: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      values: [0,1],
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'projects'
  });
};
