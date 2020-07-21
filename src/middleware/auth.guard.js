const authSer = require('./../services/auth.service.js');
// const _ = require('underscore');

/**
 * verificacion de token valido para autenticar la peticion
 */
function isAuth(req, res, next) {
  try {
    const token = extractToken(req);

    if (!token) {
      throw { status: 401, message: `You don't have authorization`, errors: `You don't have authorization` };
    }

    const payload = authSer.decodeToken(token);

    req.user = payload.user;

    next();
  } catch (error) {
    next(error);
  }
}

function extractToken(req) {
  let token = '';

  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query.token) {
    token = req.query.token;
  }

  return token;
}

module.exports = {
  isAuth,
};
