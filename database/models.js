const Sequelize = require('sequelize');
const sequelize = require('./index.js')

const Favorite = sequelize.define('favorite', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  recipeId: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER,
    defaultValue: 1/*,
    references: {
      model: User,
      key: 'id',

      // This declares when to check the foreign key constraint. PostgreSQL only.
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    } */
  }
}, {timestamps: false});

const Pantry = sequelize.define('pantry', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ingredient: {
    type: Sequelize.STRING
  },
  ingredientId: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.FLOAT(10, 3)
  },
  // units: {
  //   type: Sequelize.STRING
  // },
  userId: {
    type: Sequelize.INTEGER,
    defaultValue: 1/*,
    references: {
      model: User,
      key: 'id',

      // This declares when to check the foreign key constraint. PostgreSQL only.
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    } */
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

  module.exports = {Pantry, Favorite};