// require('dotenv').config();
require('./config/config');
const express = require('express');
const app = express();

app.set('PORT', process.env.PORT);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(app.get('PORT'), function () {
  console.log(`Example app listening on port ${app.get('PORT')}!`);
});
