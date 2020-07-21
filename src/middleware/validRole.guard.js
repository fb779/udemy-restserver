const { rolesValues } = require('../config/config');

/**
 * verificacion de token valido para autenticar la peticion
 */
function isAdmin(req, res, next) {
  try {
    const user = req.user;

    if (!user || user.role !== rolesValues.admin) {
      throw { status: 401, message: `You don't have admin permission`, errors: `You don't have admin permission` };
    }

    next();
  } catch (error) {
    next(error);
  }
}

function isUser(req, res, next) {
  try {
    const user = req.user;

    if (!user || user.role !== rolesValues.user) {
      throw { status: 401, message: `You don't have authorization`, errors: `You don't have authorization` };
    }

    next();
  } catch (error) {
    next(error);
  }
}

function isClient(req, res, next) {}

module.exports = {
  isAdmin,
  isUser,
  isClient,
};
