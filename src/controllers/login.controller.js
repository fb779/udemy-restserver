const UserModel = require('../models/user.models');
// const _ = require('underscore');

async function login(req, res, next) {
  try {
    const _email = req.body.email || '';
    const _password = req.body.password || '';

    const user = await UserModel.findOne({ email: _email });

    if (!user) {
      throw { status: 401, message: `User or password is fail`, path: 'user' };
    }

    if (!user.verifyPasswordSync(_password)) {
      throw { status: 401, message: `User or password is fail`, path: 'password' };
    }
    res.status(200).json({
      ok: true,
      data: user,
      token: '',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
};
