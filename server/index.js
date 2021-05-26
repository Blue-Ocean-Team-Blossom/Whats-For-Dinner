require('dotenv').config();
const express = require('express');
const axios = require('axios');
const db = require('../database');
const session = require('express-session');

const app = express()
const port = 3000

const controller = require('../database/controller.js');

require('../config/passport');
app.use(require('../routes/index.js'));

const auth = require('../routes/auth');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});
// We will enable this when we want to require an Authorization header to access endpoints
app.use(auth.required);
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.get('/recipes', (req, res)=>{
  let ingredients = req.query.ingredients

  axios({
    method: 'get',
    url: `${process.env.RAPID_API_URL}/recipes/findByIngredients`,
    params: {
      ingredients: ingredients,
      number: 20,
      limitLicense: true,
      ranking: 1,
      ignorePantry: true,
      apiKey: process.env.API_KEY
    },
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': process.env.RAPID_API_HOST
    }
  })
    .then(recipes => {
      res.json(recipes.data)
    })
    .catch(err => {
      console.log(`unable to get recipes by ingredients, ${err}`)
    })
});

app.get('/recipes/pantry', (req, res) => {

  let id = req.payload.id;
  controller.getPantry(id)
    .then(ingredients => {
      ingredients = ingredients.map(data => {
        return data.dataValues.ingredient
      }).join(',')
      axios({
        method: 'get',
        url: `${process.env.RAPID_API_URL}/recipes/findByIngredients`,
        params: {
          ingredients: ingredients,
          number: 20,
          limitLicense: true,
          ranking: 1,
          ignorePantry: true,
          apiKey: process.env.API_KEY
        },
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': process.env.RAPID_API_HOST
        }
      })
        .then(recipes => {
          res.json(recipes.data)
        })
        .catch(err => {
          console.log(`unable to get recipes by ingredients, ${err}`)
          res.end()
        })
    })
    .catch(err => {
      console.log(`unable to get ingredients, ${err}`)
      res.end()
    })
})

app.get('/recipes/:recipeId', (req, res)=>{
  let recipeId = parseInt(req.params.recipeId);

  const options = {
    method: 'GET',
    url: process.env.RAPID_API_URL + `/recipes/${recipeId}/information`,
    params: {
      apiKey: process.env.API_KEY
    },
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': process.env.RAPID_API_HOST
    }
  };

  axios.request(options).then((response) => {
    res.send(response.data);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
});

app.get('/pantry', (req, res)=>{

  let id = req.payload.id;
  controller.getPantry(id)
    .then(ingredients => {
      res.status(200).send(ingredients)
    })
    .catch(err => {
      console.log(`unable to get ingredients, ${err}`)
      res.status(500).send()
    })
});

app.put('/pantry', (req, res)=>{
  controller.updatePantry(req.body.pantryId, req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      console.error(err);
      res.sendStatus(400);
    })
});

app.post('/pantry', (req, res)=>{
  let pantryObj = {...req.body};
  pantryObj.userId = req.payload.id;
  console.log(pantryObj);
  // expect ingredient, ingredientId,quantity, userId
  // assumes req.body comes in shape of {ingredient, ingredientId, quantity, and userId}
  controller.postPantry(pantryObj)
    .then(()=>{
      res.sendStatus(201);
    })
    .catch((err)=>{
      console.log(err);
      res.sendStatus(500);
    });
});

app.delete('/pantry', (req, res)=>{
  // assumes sends id in a body
  controller.deletePantry(req.body.id)
    .then(()=>{
      res.sendStatus(200)
    })
    .catch((err)=>{
      console.log(err);
      res.sendStatus(500);
    })
});

// ENDPOINTS FOR /grocery

app.get('/grocery', (req, res)=>{
  let id = req.payload.id;

  controller.getGrocery(id)
    .then(ingredients => {
      res.status(200).send(ingredients)
    })
    .catch(err => {
      console.log(`unable to get ingredients, ${err}`)
      res.status(500).send()
    })
});

app.put('/grocery', (req, res)=>{
  controller.updateGrocery(req.body.groceryId, req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      console.error(err);
      res.sendStatus(400);
    })
});

app.post('/grocery', (req, res)=>{
  let groceryObj = {...req.body};
  groceryObj.userId = req.payload.id;

  // expect ingredient, ingredientId,quantity, userId
  // assumes req.body comes in shape of {ingredient, ingredientId, quantity, and userId}
  controller.postGrocery(groceryObj)
    .then(()=>{
      res.sendStatus(201);
    })
    .catch((err)=>{
      console.log(err);
      res.sendStatus(500);
    });
});

app.delete('/grocery', (req, res)=>{
  // assumes sends id in a body
  controller.deleteGrocery(req.body.id)
    .then(()=>{
      res.sendStatus(200)
    })
    .catch((err)=>{
      console.log(err);
      res.sendStatus(500);
    })
});

// ENDPOINTS FOR /ingredients

app.get('/ingredients', (req, res) => {
  // console.log(req.query);
  let {query} = req.query;

  // console.log(`${process.env.RAPID_API_URL}/food/ingredients/search`);
  axios({
    method: 'get',
    url: `${process.env.RAPID_API_URL}/food/ingredients/autocomplete`,
    params: {
      query: query,
      metaInformation: true,
      apiKey: process.env.API_KEY
    },
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': process.env.RAPID_API_HOST
    }
  })
  .then((results) => {
    res.json(results.data);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(400);
  })
});

// ENDPOINTS FOR /favorites

app.get('/favorites', (req, res)=>{
  controller.getFavorite(req.payload.id)
    .then(favorites => {
      res.status(200).send(favorites)
    })
    .catch(err => {
      console.log(`unable to get favorites, ${err}`)
      res.status(500).send()
    })
});
app.post('/favorites', (req, res)=>{
  let favObj = {...req.body};
  favObj.userId = req.payload.id;
  // assumes req.body comes in shape of {recipeId, title, image, and userId}
  controller.postFavorite(favObj)
    .then(()=>{
      res.sendStatus(201);
    })
    .catch((err)=>{
      console.log(err);
      res.sendStatus(500);
    });
});
app.delete('/favorites', (req, res)=>{
  controller.deleteFavorite(req.body.id)
    .then(()=>{
      res.sendStatus(200)
    })
    .catch((err)=>{
      console.log(err);
      res.sendStatus(500);
    })
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})