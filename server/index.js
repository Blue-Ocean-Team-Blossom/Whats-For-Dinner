const express = require('express');
const db = require('../database');

const app = express()
const port = 3000

const controller = require('../database/controller.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/recipes', (req, res)=>{
  res.end()
});

app.get('/pantry', (req, res)=>{
  res.end()
});

app.put('/pantry', (req, res)=>{
  res.end();
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

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})