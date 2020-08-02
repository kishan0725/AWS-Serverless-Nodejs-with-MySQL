module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clients', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    client_name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profile_picture_url: {
      type: DataTypes.TEXT,
      allowNull: true
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
    },
    is_active: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      values: [0,1],
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'clients'
  });
};
