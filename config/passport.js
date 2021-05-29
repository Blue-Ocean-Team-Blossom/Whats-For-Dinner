const sequelize = require('sequelize');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const {User} = require('../database/models.js')

passport.use(new LocalStrategy({
  usernameField: 'user[username]',
  passwordField: 'user[password]'
}, (username, password, done) => {
  User.findOne({where: {username: username}})
    .then((user) => {

      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));