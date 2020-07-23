const _ = require('underscore');

class TokenError extends Error {
  ok = false;
  status = 401;
  name = 'TokenError';

  constructor(err) {
    super(err.message);
    this.errors = err;
  }

  toJson() {
    return _.pick(this, ['name', 'message']);
  }
}

module.exports = TokenError;
