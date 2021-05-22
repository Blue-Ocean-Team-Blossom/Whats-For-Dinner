const sequelize = require('./index.js');
const {Pantry} = require('./models.js');

const postPantry = (pantryObj) => {
  return Pantry.create({...pantryObj});
}

module.exports = {postPantry};