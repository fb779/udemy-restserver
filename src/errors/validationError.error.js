const _ = require('underscore');

class ValidationError extends Error {
  ok = false;
  status = 400;
  name = 'ValidationError';

  constructor(err) {
    super(err.message);
    this._err = err;
    this.errors = err.errors;
  }

  toJson() {
    return _.pick(this, ['name', 'message', 'errors']);
  }
}

module.exports = ValidationError;
