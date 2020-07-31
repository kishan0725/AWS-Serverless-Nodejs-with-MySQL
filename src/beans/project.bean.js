/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project', {
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
    status: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    required_resources: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    is_active: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'project'
  });
};
