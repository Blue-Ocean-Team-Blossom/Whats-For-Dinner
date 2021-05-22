const sequelize = require('./database/index.js');
const {Pantry} = require('./database/models.js');

const postPantry = (pantryObj) => {
  return Pantry.create({...pantryObj});
}

module.exports = {postPantry};