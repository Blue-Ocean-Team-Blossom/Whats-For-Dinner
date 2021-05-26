const sequelize = require('./database/index.js');
const {Pantry, Favorite, Grocery, User} = require('./database/models.js');

var PantryItems = ['cheese', 'bacon', 'apples'];
var favoriteItems = [{
  "recipeId": 662428,
  "title": "Sweet & Spicy White Cheddar Cheese Ball with apples & Bacon",
  "image": "https://spoonacular.com/recipeImages/662428-312x231.jpg",
  "userId": 1
}];
var GroceryItems = ['wine'];
var users = [{username: 'garrett', password: 'garrettpw'}, {username: 'peter', password: 'peterpw'}];
const seed = async() => {
  await sequelize.sync({force: true})
  await Promise.all(users.map(user => {
    const finalUser = User.build(user);
    finalUser.setPassword(user.password);
    return finalUser.save();
  }))
  await Promise.all(PantryItems.map(pantryItem => {
    let pantryObj = {ingredient: pantryItem, quantity: 5, ingredientId: 1234, userId: 1};
    return Pantry.create(pantryObj);
  }))
  await Promise.all(GroceryItems.map(groceryItem => {
    let groceryObj = {ingredient: groceryItem, quantity: 5, ingredientId: 1234, userId: 1};
    return Grocery.create(groceryObj);
  }))
  await Promise.all(favoriteItems.map(favoriteItem => {
    return Favorite.create(favoriteItem);
  }))
  console.log('database seeded successfully');
  sequelize.close();
}

seed()
.catch(err => {
  console.log(`database unable to populate, ${err}`)
  sequelize.close()
})
