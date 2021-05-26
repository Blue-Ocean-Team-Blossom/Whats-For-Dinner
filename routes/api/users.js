const sequelize = require('sequelize');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const express = require('express');

const {User} = require('../../database/models.js');

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.post('/', auth.optional, (req, res, next) => {
  // console.log(req.body);
  const {body: {user}} = req;


  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = User.build(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }))
    .catch((err) => {
      console.error(err);
      res.sendStatus(400);
    })
});

router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }
    debugger;
    console.log(passportUser);

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.sendStatus(400);
  })(req, res, next);
});

router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return User.findOne({where: {id: id}})
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });

});

module.exports = router;
