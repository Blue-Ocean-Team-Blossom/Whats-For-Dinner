const sequelize = require('./index.js');
const {Pantry, Favorite} = require('./models.js');

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

const getPantry = (id) => {
  return Pantry.findAll({
    where: {
      userId: id
    }
  });
}

const updatePantry = (pantryId, updateObj) => {
  return Pantry.update(updateObj, {where: {id: pantryId}});
}

module.exports = {postPantry, updatePantry, getPantry, deletePantry};
