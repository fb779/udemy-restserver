/**
 * Importaciones
 */
require('dotenv').config();
require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('./config/database.js');
const config = require('./config/config.js');
const path = require('path');

/**
 * Definición de valores para la app
 */
app.set('port', config.port);

/**
 * configuraciones
 */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

/** urls de usuario */

const routes = require('./routes/routes');

app.get('/', function (req, res) {
  res.status(200).json({
    ok: true,
    message: 'Hello World!',
  });
});

app.use('/public', express.static(path.resolve(__dirname, '..', 'public')));

app.use(routes);

/***************************************************
 * Inicializacion del servidor
 ***************************************************/

const db = mongoose.connection;

db.then((response) => {
  console.log(`Base de datos OK!`);

  app.listen(app.get('port'), () => {
    console.log(`API listening on port ${app.get('port')}!`);
  });
}).catch((err) => {
  console.error('DB connection error:', err);
});
