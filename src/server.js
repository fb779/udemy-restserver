/**
 * Importaciones
 */
require('dotenv').config();
require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/database.js');
const config = require('./config/config.js');
const path = require('path');

const socketIO = require('socket.io');
const http = require('http');
/**
 * Definicion del app de express
 */
const app = express();

/**
 * Definición de valores para la app
 */
app.set('port', config.port);

/**
 * configuraciones
 */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

// app.use(function (req, res, next) {
//   req.socket = socket;
//   next();
// });

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
 * Definicion del server con la instancia del app
 ***************************************************/
const server = http.createServer(app);

/***************************************************
 * Definicion del socket
 ***************************************************/
const io = socketIO().listen(server);
module.exports = {io};
global.io = io;

// module.exports.io = socketIO().listen(server);

require('./sockets/socket.js');

/***************************************************
 * definicion de la instancia de base de datos
 ***************************************************/
const db = mongoose.connection;

/***************************************************
 * Inicializacion del servidor
 ***************************************************/
db.then((response) => {
  console.log(`Base de datos OK!`);

  server.listen(app.get('port'), () => {
    console.log(`API listening on port ${app.get('port')}!`);
  });
}).catch((err) => {
  console.error('DB connection error:', err);
});
