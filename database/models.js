const Sequelize = require('sequelize');
const sequelize = require('./index.js')

const Pantry = sequelize.define('pantry', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ingredient: {
    type: Sequelize.STRING
  }
}, {timestamps: false})

sequelize
  .authenticate()
  .then(() => {
    console.log(`postgres connected`)
  })
  .catch(err => {
    console.log(`postgres unable to connect, ${err}`)
  })

  module.exports = {Pantry}