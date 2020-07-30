'use strict'

module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define("client", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        client_name: {
            type: DataTypes.STRING
        },
        about: {
            type: DataTypes.STRING(500)
        },
        profile_picture_url: {
            type: DataTypes.STRING
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        is_active: {
            type: DataTypes.BOOLEAN
        }
    });
  
    return Client;
  };