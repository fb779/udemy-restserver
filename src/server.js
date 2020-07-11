/**
 * Importaciones
 */
// require('dotenv').config();
require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
/**
 * configuraciones
 */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.set('PORT', process.env.PORT);

app.get('/', function (req, res) {
  res.status(200).json({
    ok: true,
    message: 'Hello World!',
  });
});

/** urls de usuario */
app.get('/user', function (req, res) {
  res.status(200).json({
    ok: true,
    message: 'Hello Users!',
  });
});

app.post('/user', function (req, res) {
  const body = req.body;

  res.status(200).json({
    ok: true,
    message: 'post users!',
    body,
  });
});

app.put('/user/:id', function (req, res) {
  res.status(200).json({
    ok: true,
    message: 'Hello World!',
  });
});

app.delete('/user/:id', function (req, res) {
  res.status(200).json({
    ok: true,
    message: 'Hello World!',
  });
});

app.listen(app.get('PORT'), function () {
  console.log(`Example app listening on port ${app.get('PORT')}!`);
});
