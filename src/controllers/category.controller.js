const CategoryModel = require('../models/category.model');
const _ = require('underscore');

async function getCategory(req, res, next) {
  try {
    const id = req.params.id || null;

    const category = await CategoryModel.findById(id);

    if (!category) {
      throw { status: 404, message: 'Category not found', errors: `This category ${id} does not exist` };
    }

    return res.status(200).json({
      ok: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
}

async function getListCategory(req, res, next) {
  try {
    const list = await CategoryModel.find({}).sort('name');

    return res.status(200).json({
      ok: true,
      data: list,
    });
  } catch (error) {
    next(error);
  }
}

async function createCategory(req, res, next) {
  try {
    const body = req.body;
    body.user = req.user._id;

    const newCategory = await CategoryModel.create(body);

    return res.status(200).json({
      ok: true,
      data: newCategory,
    });
  } catch (error) {
    next(error);
  }
}

async function updateCategory(req, res, next) {
  try {
    const id = req.params.id || null;

    // Inclusion de la informacion que se permitira editar
    // const body = _.pick(req.body, ['name', 'description', 'state']);
    const body = _.pick(req.body, ['name', 'description', 'state']);

    // permite la actualizacion del campo unique
    const category = await CategoryModel.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' });

    if (!category) {
      throw { status: 404, message: 'Category not found', errors: `This category ${id} does not exist` };
    }

    return res.status(200).json({
      ok: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const id = req.params.id;

    const category = await CategoryModel.findByIdAndRemove(id);

    if (!category) {
      throw { status: 404, message: 'Category not found', errors: `This category ${id} does not exist` };
    }

    return res.status(200).json({
      ok: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCategory,
  getListCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
