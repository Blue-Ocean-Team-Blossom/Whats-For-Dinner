const sequelize = require('./index.js');
const {Pantry} = require('./models.js');

const postPantry = (pantryObj) => {
  return Pantry.create({...pantryObj});
};
const deletePantry = (id) => {
  return Pantry.destroy({
    where: {
      id: id
    }
  });
};

module.exports = {postPantry, deletePantry};