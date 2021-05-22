require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.NAME, process.env.PASS, {
  host: process.env.HOST,
  dialect: 'postgres'
});

module.exports = sequelize;