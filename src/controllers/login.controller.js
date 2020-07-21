const UserModel = require('../models/user.models.js');
// const _ = require('underscore');
const AuthService = require('./../services/auth.service.js');

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

    const token = AuthService.createToken(user);

    res.status(200).json({
      ok: true,
      data: user,
      token,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
};
