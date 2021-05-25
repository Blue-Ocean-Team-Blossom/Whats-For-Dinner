require('dotenv').config();
const express = require('express');
const axios = require('axios');
const db = require('../database');

const app = express()
const port = 3000

const controller = require('../database/controller.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

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
  let id = req.query.id;
  console.log(req.body);
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
    console.log(response.data);
    res.send(response.data);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
});

app.get('/pantry', (req, res)=>{
  let id = req.query.id;
  console.log(req.body);
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
    console.log(results.data);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(400);
  })
});

app.get('/favorites', (req, res)=>{
  controller.getFavorite(req.query.id)
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