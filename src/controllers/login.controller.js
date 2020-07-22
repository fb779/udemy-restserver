const UserModel = require('../models/user.models.js');
// const _ = require('underscore');
const AuthService = require('./../services/auth.service.js');
const { googleVerifyToken } = require('../helper/google.helper.js');

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
      data: token,
      // user,
    });
  } catch (error) {
    next(error);
  }
}

async function loginGoogle(req, res, next) {
  try {
    const googleToken = req.body.idtoken || '';

    let googleUser = await googleVerifyToken(googleToken);

    let user = await UserModel.findOne({ email: googleUser.email });

    if (!user) {
      user = await UserModel.create({ ...googleUser });
    } else {
      if (user.google === false) {
        throw { status: 400, message: `User can't auth whit google acount`, path: 'user' };
      }
    }

    const token = AuthService.createToken(user);

    return res.status(200).json({
      ok: true,
      data: token,
      // user,
    });
  } catch (error) {
    error.status = 401;
    error.name = 'GoogleError';
    next(error);
  }
}

module.exports = {
  login,
  loginGoogle,
};
