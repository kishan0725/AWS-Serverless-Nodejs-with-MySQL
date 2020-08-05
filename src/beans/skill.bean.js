module.exports = function(sequelize, DataTypes) {
    const Skill = sequelize.define('skills', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true
      },
      skill_name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: { len: [0,60] }
      },
      approval_status: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
        values: [0,1],
        defaultValue: 0
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
      rejection_reason: {
        type: DataTypes.STRING(100),
        defaultValue: "Not Available",
        allowNull: true
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      skill_requested_by: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'skills'
    });
    return Skill;
  };