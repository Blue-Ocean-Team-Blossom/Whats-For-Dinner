const sequelize = require('./index.js');
const {Pantry} = require('./models.js');

const postPantry = (pantryObj) => {
  return Pantry.create({...pantryObj});
}

const updatePantry = (pantryId, updateObj) => {
  return Pantry.update(updateObj, {where: {id: pantryId}});
}

module.exports = {postPantry, updatePantry};