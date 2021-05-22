const sequelize = require('./database/index.js');
const {Pantry} = require('./database/models.js');

var PantryItems = [];
const seed = async() => {
  await sequelize.sync({force: true})
  await Promise.all(PantryItems.map(pantryItem => {
    return Pantry.create(pantryItem)
  }))
  console.log('database seeded successfully')
  sequelize.close()
}

seed()
.catch(err => {
  console.log(`databse unable to populate, ${err}`)
  sequelize.close()
})
