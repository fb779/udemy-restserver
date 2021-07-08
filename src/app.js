/**
 * Importaciones
 */
require('dotenv').config();

/**
 * Instancia de la app
 */

const Server = require('./clases/Server');

const server = new Server();

server.listen();