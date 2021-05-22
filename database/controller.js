const sequelize = require('./index.js');
const {Pantry} = require('./models.js');

const postPantry = (pantryObj) => {
  return Pantry.create({...pantryObj});
}

const getPantry = (id) => {
  return Pantry.findAll({
    where: {
      userId: id
    }
  });
}

module.exports = {postPantry, getPantry};