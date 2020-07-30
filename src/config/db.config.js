'use strict';

var Sequelize = require('sequelize');
var db = {};

var sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.ENDPOINT,
    port: 3306,
    logging: false, // Disable the logging. It is consuming the time on lambda function.
    dialect: "mysql",
    define: {
        timestamps: false,
    },
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 20000,
        idle: 10000
    }
});

module.exports = {
    'Sequelize': Sequelize,
    'sequelize': sequelize
};