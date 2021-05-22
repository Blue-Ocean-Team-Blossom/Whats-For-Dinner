const express = require('express');
const db = require('../database');

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
