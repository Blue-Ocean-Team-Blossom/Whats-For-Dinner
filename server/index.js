const express = require('express');
const db = require('../database');

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/recipes', (req, res)=>{
  res.end()
});
app.get('/pantry', (req, res)=>{
  res.end()
});
app.put('/pantry', (req, res)=>{
  res.end()
});
app.post('/pantry', (req, res)=>{
  res.end()
});
app.delete('/pantry', (req, res)=>{
  res.end()
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})