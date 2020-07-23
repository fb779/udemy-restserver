const { seed } = require('../config/config.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const _ = require('underscore');
const tokenError = require('../errors/tokenError.error.js');
// metodo encargado de crear un token para las peticiones
function createToken(_user) {
  const user = _.pick(_user, ['name', 'email', 'role']);

  let dt = moment();

  const payload = {
    sub: user._id,
    user,
    iat: dt.unix(),
    exp: dt.add(2, 'days').unix(),
    // exp: dt.add(2, 'minutes').unix(),
  };

  return jwt.sign(payload, seed);
}

// metodo encargado de validar (verificacion de firma y fecha) y decodificar el token
// en caso contrario genera un error
function decodeToken(token) {
  try {
    const payload = jwt.verify(token, seed);

    return payload;
  } catch (error) {
    // error.status = 401;
    // throw error;
    throw new tokenError(error);
  }
}

module.exports = {
  createToken,
  decodeToken,
};
