const ProductModel = require('../models/producto.model.js');
const CategoryModel = require('../models/category.model.js');
const _ = require('underscore');

async function getProduct(req, res, next) {
  try {
    const id = req.params.id || null;

    const product = await ProductModel.findById(id);

    if (!product) {
      throw { status: 404, message: 'Product not found', errors: `This product ${id} does not exist` };
    }

    return res.status(200).json({
      ok: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

async function getListProduct(req, res, next) {
  try {
    const limit = parseInt(req.query.limit) || 5;
    let offSet = parseInt(req.query.page - 1) * limit || 0;

    offSet = offSet > 0 ? offSet : 0;

    let filter = { state: true };

    const totalRegistros = await ProductModel.countDocuments(filter);

    const list = await ProductModel.find(filter).populate({ path: 'category', select: 'name description' }).skip(offSet).limit(limit).sort('name');

    return res.status(200).json({
      ok: true,
      data: list,
      totalPage: limit,
      total: totalRegistros,
    });
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const body = req.body;

    body.user = req.user._id;

    // const category = await CategoryModel.findById(body.category);

    // body.category = category;

    const newproduct = await ProductModel.create(body);

    return res.status(200).json({
      ok: true,
      data: newproduct,
      body,
    });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const id = req.params.id || null;

    // Inclusion de la informacion que se permitira editar
    // const body = _.pick(req.body, ['name', 'description', 'state']);
    const body = _.pick(req.body, ['name', 'price', 'description', 'category']);

    // permite la actualizacion del campo unique
    const product = await ProductModel.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' });

    if (!product) {
      throw { status: 404, message: 'Product not found', errors: `This product ${id} does not exist` };
    }

    return res.status(200).json({
      ok: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const id = req.params.id;

    const body = { state: false };

    // permite la actualizacion del campo unique
    const product = await ProductModel.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' });

    if (!product) {
      throw { status: 404, message: 'Product not found', errors: `This product ${id} does not exist` };
    }

    return res.status(200).json({
      ok: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

async function findProduct(req, res, next) {
  try {
    const term = req.params.term;

    const regex = new RegExp(term, 'i');

    console.log(term);

    const list = await ProductModel.find({ name: regex });

    return res.status(200).json({
      ok: true,
      data: list,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProduct,
  getListProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  findProduct,
};
