module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_type', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    user_type: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    underscored: true,
    tableName: 'user_type'
  });
};
