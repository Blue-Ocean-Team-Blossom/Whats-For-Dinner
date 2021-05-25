const sequelize = require('./index.js');
const {Pantry, Favorite, Grocery} = require('./models.js');

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
};
const updatePantry = (pantryId, updateObj) => {
  return Pantry.update(updateObj, {where: {id: pantryId}});
};

const postFavorite = (favObj) => {
  return Favorite.create({...favObj});
};
const deleteFavorite = (id) => {
  return Favorite.destroy({
    where: {
      id: id
    }
  });
};
const getFavorite = (id) => {
  return Favorite.findAll({
    where: {
      userId: id
    }
  });
};

module.exports = {postPantry, updatePantry, getPantry, deletePantry};