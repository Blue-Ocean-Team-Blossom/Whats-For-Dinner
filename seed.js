const sequelize = require('./database/index.js');
const {Pantry} = require('./database/models.js');

var PantryItems = ['cheese', 'bacon', 'apples'];
const seed = async() => {
  await sequelize.sync({force: true})
  await Promise.all(PantryItems.map(pantryItem => {
    let pantryObj = {ingredient: pantryItem}
    return Pantry.create(pantryObj)
  }))
  console.log('database seeded successfully')
  sequelize.close()
}

seed()
.catch(err => {
  console.log(`database unable to populate, ${err}`)
  sequelize.close()
})
