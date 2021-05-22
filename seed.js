const sequelize = require('./database/index.js');
const {Pantry} = require('./database/models.js');

var PantryItems = ['salmon', 'duck', 'eggs'];
const seed = async() => {
  await sequelize.sync({force: true})
  await Promise.all(PantryItems.map(pantryItem => {
    let PantryObj = {ingredient: pantryItem, quantity: 0};
    return Pantry.create(PantryObj)
  }))
  console.log('database seeded successfully')
  sequelize.close()
}

seed()
.catch(err => {
  console.log(`database unable to populate, ${err}`)
  sequelize.close()
})
