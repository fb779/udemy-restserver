/*********************************
 * Definicion del environment
 *********************************/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*********************************
 * Definicion del puerto
 *********************************/
process.env.PORT = process.env.PORT || 3000;
const port = process.env.PORT;

/*********************************
 * Definicion de base de datos
 *********************************/
let db_url = '';
if (process.env.NODE_ENV === 'dev') {
  db_url = `mongodb://localhost:27017/cafe`;
} else {
  process.env.MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  db_url = process.env.MONGODB_URI || `mongodb://localhost:27017/cafe`;
}

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

/*********************************
 * Export de las configuraciones
 *********************************/
module.exports = {
  port,
  seed: process.env.SEED,
  db_url,
  // definicion de validaciones para modelos
  rolesValid,
  // definicion de valores para modelos
  rolesValues,
};
