const sequelize = require('./index.js');
const {Pantry, Favorite, Grocery} = require('./models.js');

const postPantry = (pantryObj) => {
  // if Obj already 'exists' in the database (i.e. same ingredient, units, and userId)
  // update that object instead.
  return Pantry.findOne({where: {ingredient: pantryObj.ingredient, units: pantryObj.units, userId: pantryObj.userId}})
    .then((result)=>{
      if (!result) {
        return Pantry.create({...pantryObj});
      } else {
        pantryObj.quantity = pantryObj.quantity + result.quantity;
        let id = result.id;
        return updatePantry(id, pantryObj);
      }
    })
  // return Pantry.create({...pantryObj});
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

const postGrocery = (grocObj) => {
  return Grocery.findOne({where: {ingredient: grocObj.ingredient, units: grocObj.units, userId: grocObj.userId}})
    .then((result)=>{
      if (!result) {
        return Grocery.create({...grocObj});
      } else {
        grocObj.quantity = grocObj.quantity + result.quantity;
        let id = result.id;
        return updatePantry(id, grocObj);
      }
    })
};

const deleteGrocery = (id) => {
  return Grocery.destroy({
    where: {
      id: id
    }
  });
};

const getGrocery = (id) => {
  return Grocery.findAll({
    where: {
      userId: id
    }
  });
};

const updateGrocery = (groceryId, updateObj) => {
  return Grocery.update(updateObj, {where: {id: groceryId}});
};

module.exports = {postPantry, updatePantry, getPantry, deletePantry, postGrocery, updateGrocery, getGrocery, deleteGrocery, postFavorite, getFavorite, deleteFavorite};