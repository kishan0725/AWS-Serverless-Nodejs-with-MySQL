'use strict'
const Skill = require('./skill.bean');
module.exports = (sequelize, DataTypes) => {
    const UserSkill = sequelize.define("user_skill", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        skill_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Skill,
                key: 'id'
             }
        }
    },
    {
        underscored: true
    });
  
    return UserSkill;
  };