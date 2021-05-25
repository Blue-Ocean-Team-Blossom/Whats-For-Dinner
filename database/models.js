const Sequelize = require('sequelize');
const sequelize = require('./index.js')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const Grocery = sequelize.define('grocery', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ingredient: {
    type: Sequelize.STRING
  },
  ingredientId: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.FLOAT(10, 3)
  },
  // units: {
  //   type: Sequelize.STRING
  // },
  userId: {
    type: Sequelize.INTEGER,
    defaultValue: 1/*,
    references: {
      model: User,
      key: 'id',

      // This declares when to check the foreign key constraint. PostgreSQL only.
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    } */
  }
}, {timestamps: false});

const Favorite = sequelize.define('favorite', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  recipeId: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.INTEGER,
    defaultValue: 1/*,
    references: {
      model: User,
      key: 'id',

      // This declares when to check the foreign key constraint. PostgreSQL only.
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    } */
  }
}, {timestamps: false});

const Pantry = sequelize.define('pantry', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ingredient: {
    type: Sequelize.STRING
  },
  ingredientId: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.FLOAT(10, 3)
  },
  // units: {
  //   type: Sequelize.STRING
  // },
  userId: {
    type: Sequelize.INTEGER,
    defaultValue: 1/*,
    references: {
      model: User,
      key: 'id',

      // This declares when to check the foreign key constraint. PostgreSQL only.
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    } */
  }
}, {timestamps: false})

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING
  },
  hash: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  }
}, {timestamps: false})

User.prototype.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 100, 'sha512').toString('hex');
};

User.prototype.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 100, 'sha512').toString('hex');
  return this.hash === hash;
};

User.prototype.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    username: this.username,
    id: this.id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

User.prototype.toAuthJSON = function() {
  return {
    id: this.id,
    username: this.username,
    token: this.generateJWT(),
  };
};


sequelize
  .authenticate()
  .then(() => {
    console.log(`postgres connected`)
  })
  .catch(err => {
    console.log(`postgres unable to connect, ${err}`)
  })

  module.exports = {Pantry, Favorite, Grocery, User};