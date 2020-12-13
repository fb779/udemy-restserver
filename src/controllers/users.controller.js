const UserModel = require('../models/user.models');
const _ = require('underscore');

async function getListUser(req, res, next) {
  try {
    const limit = parseInt(req.query.limit) || 5;
    let offSet = parseInt(req.query.page - 1) * limit || 0;

    offSet = offSet > 0 ? offSet : 0;

    let filter = {state: true};

    const totalRegistros = await UserModel.countDocuments(filter);

    const data = await UserModel.find(filter).select('name email img role').skip(offSet).limit(limit);

    this.global.io.emit('mensaje', {message: 'emision desde el controller', data});

    res.status(200).json({
      ok: true,
      message: 'Usuarios - get',
      data,
      totalPage: limit,
      total: totalRegistros,
    });
  } catch (error) {
    // console.log('error del controller: get list user');
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const id = req.params.id || null;

    const user = await UserModel.findById(id);

    if (!user) {
      throw {status: 404, message: 'User not found', errors: `This user ${id} does not exist`};
    }

    return res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    // console.log('error del controller: get user');
    next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const body = req.body;

    const newUser = await UserModel.create(body);

    // const newUser = new UserModel(body);
    // await newUser.save();

    return res.status(200).json({
      ok: true,
      data: newUser,
    });
  } catch (error) {
    // console.log('error del controller: create');
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const id = req.params.id || null;

    // Inclusion de la informacion que se permitira editar
    // const body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state', 'password']);
    const body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);

    // permite la actualizacion del email al editar
    const user = await UserModel.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'});
    // no permite la actualizacion del email al editar
    // const user = await UserModel.findByIdAndUpdate(id, body, {new: true, runValidators: true});

    if (!user) {
      throw {status: 404, message: 'User not found', errors: `This user ${id} does not exist`};
    }

    return res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (error) {
    // console.log('error del controller, update');
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const id = req.params.id;

    const body = {state: false};

    const user = await UserModel.findByIdAndUpdate(id, body, {new: true});

    if (!user) {
      throw {status: 404, message: 'User not found', errors: `This user ${id} does not exist`};
    }

    return res.status(200).json({
      ok: true,
      message: 'eliminacion del usuario',
      data: user,
    });
  } catch (error) {
    // console.log('error del controller: delete');
    next(error);
  }
}

async function dropUser(req, res, next) {
  try {
    const id = req.params.id;

    const user = await UserModel.findByIdAndRemove(id);

    if (!user) {
      throw {status: 404, message: 'User not found', errors: `This user ${id} does not exist`};
    }

    return res.status(200).json({
      ok: true,
      message: 'Drop user succecfull',
      data: user,
    });
  } catch (error) {
    // console.log('error del controller: delete');
    next(error);
  }
}

module.exports = {
  getListUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
