/*******************************************
 * Imports
 *******************************************/
const path = require('path');

/*********************************
 * Definicion del environment
 *********************************/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*********************************
 * Definicion del puerto
 *********************************/
process.env.PORT = process.env.PORT || 3100;
const port = process.env.PORT;

/*********************************
 * Definicion de base de datos
 *********************************/
let db_url = '';
if (process.env.NODE_ENV !== 'dev') {
  process.env.MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  db_url = process.env.MONGODB_URI;
} else {
  db_url = `mongodb://localhost:27017/cafe`;
  // db_url = `mongodb://mongoservice:27017/cafe`;
}

/*********************************
 * Definicion del seed
 *********************************/
const seed = process.env.SEED;

/*********************************
 * Definicion del seed
 *********************************/
const client_id = process.env.CLIENT_ID;

/**
 * Definicion de validaciones para modelos
 */
const rolesValid = {
  values: ['ADMIN', 'USER', 'CLIENT'],
  message: `{VALUE} doesn't a role valid`,
};

/**
 * Definicion de valores
 */
const rolesValues = {
  admin: 'ADMIN',
  user: 'USER',
  client: 'CLIENT',
};

/*******************************************
 * Definicion de ruta para upload
 *******************************************/
const uploadDir = path.join(__dirname, '../../storage');
const noImagePath = path.join(__dirname, '../../storage/assets/no-image.jpg');

/*********************************
 * Types para carga de imagenes
 *********************************/
typesUploads = {
  users: 'users',
  products: 'products',
};

/*********************************
 * Export de las configuraciones
 *********************************/
module.exports = {
  port,
  seed,
  db_url,
  // definicion de validaciones para modelos
  rolesValid,
  // definicion de valores para modelos
  rolesValues,
  client_id,
  uploadDir,
  noImagePath,
  typesUploads,
};
