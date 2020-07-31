'use strict'

module.exports = function(sequelize, DataTypes) {
    const Skill = sequelize.define('skill', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true
      },
      skill_name: {
        type: DataTypes.STRING(60),
        allowNull: false
      },
      approval_status: {
        type: DataTypes.INTEGER(4),
        allowNull: false
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
        allowNull: true
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'skill'
    });
    return Skill;
  };