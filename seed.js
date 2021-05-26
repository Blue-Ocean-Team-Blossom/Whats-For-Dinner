const sequelize = require('./database/index.js');
const {Pantry, Favorite, Grocery, User} = require('./database/models.js');

var PantryItems = ['cheese', 'bacon', 'apples'];
var favoriteItems = [{
  "recipeId": 662428,
  "title": "Sweet & Spicy White Cheddar Cheese Ball with apples & Bacon",
  "image": "https://spoonacular.com/recipeImages/662428-312x231.jpg",
}];
var GroceryItems = ['wine'];
var users = [{username: 'user'}];
const seed = async() => {
  await sequelize.sync({force: true})
  await Promise.all(PantryItems.map(pantryItem => {
    let pantryObj = {ingredient: pantryItem}
    return Pantry.create(pantryObj);
  }))
  await Promise.all(GroceryItems.map(groceryItem => {
    let groceryObj = {ingredient: groceryItem}
    return Grocery.create(groceryObj);
  }))
  await Promise.all(favoriteItems.map(favoriteItem => {
    return Favorite.create(favoriteItem);
  }))
  await Promise.all(users.map(user => {
    return User.create(user);
  }))
  console.log('database seeded successfully');
  sequelize.close();
}

seed()
.catch(err => {
  console.log(`database unable to populate, ${err}`)
  sequelize.close()
})
