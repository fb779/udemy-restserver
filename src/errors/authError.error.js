const _ = require('underscore');

class AuthError extends Error {
  ok = false;
  status = 403;
  name = 'AuthError';

  constructor(err = {}) {
    super('You do not have access');
    this.errors = err;
  }

  toJson() {
    return _.pick(this, ['name', 'message']);
  }
}

module.exports = AuthError;
