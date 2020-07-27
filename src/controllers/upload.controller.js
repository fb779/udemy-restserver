const fs = require('fs');
const path = require('path');
// const _ = require('underscore');
const { uploadDir } = require('../config/config.js');
const { validTypes, validExtension } = require('../helper/upload.helper.js');
const UserModel = require('../models/user.models.js');
const ProductModel = require('../models/producto.model.js');

async function uploadSingleFile(req, res, next) {
  try {
    const type = req.params.type;
    const id = req.params.id;
    const user = req.user;

    const file = UpFile(req.file, { type, id });

    let data = null;

    switch (type) {
      case typesUploads.users:
        data = await updateImgUser(id, file.name);
        break;

      case typesUploads.products:
        data = await updateImgProduct(id, file.name);
        break;
    }

    return res.status(200).json({
      ok: true,
      message: `llegamos para la carga de imagenes`,
      file,
      data,
    });
  } catch (error) {
    next(error);
  }
}

async function uploadManyFile(req, res, next) {}

/**
 * Metodo para la carga de una imagen
 */
function UpFile(file, ...params) {
  const [dt] = [...params];

  const dataFile = makePathFile(file, dt.type, dt.id);

  if (!validExtension(file)) {
    throw { status: 400, ok: false, message: 'The extension is not allow' };
  }

  if (!validTypes(dt.type)) {
    throw { status: 400, ok: false, message: 'The type is not valid' };
  }

  file.mv(dataFile.imgPath);

  return {
    direcotry: dataFile.imgPath,
    name: dataFile.name,
  };
}

// crear el nombre
function makePathFile(file, type, id) {
  const ext = file.name.split('.').pop();
  const miliseconds = new Date().getMilliseconds();

  let nameFile = `${id}-${miliseconds}.${ext}`;

  return { name: nameFile, imgPath: path.join(uploadDir, type, nameFile) };
}

async function updateImgUser(id, imgName) {
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      throw { status: 403, ok: false, message: `User is not found` };
    }

    const pathImgOld = path.resolve(uploadDir, typesUploads.users, user.img);

    deleteImg(user.img, pathImgOld);

    user.img = imgName;

    await user.save();

    return user;
  } catch (error) {
    const pathImgOld = path.resolve(uploadDir, typesUploads.users, imgName);
    deleteImg(imgName, pathImgOld);
    throw error;
  }
}

function deleteImg(nameImg, pathOld) {
  if (nameImg && fs.existsSync(pathOld)) {
    fs.unlinkSync(pathOld);
  }
}

async function updateImgProduct(id, imgName) {
  try {
    const product = await ProductModel.findById(id);

    if (!product) {
      throw { status: 403, ok: false, message: `Product is not found` };
    }

    const pathImgOld = path.resolve(uploadDir, typesUploads.products, product.img);

    deleteImg(product.img, pathImgOld);

    product.img = imgName;

    await product.save();

    return product;
  } catch (error) {
    const pathImgOld = path.resolve(uploadDir, typesUploads.products, imgName);
    deleteImg(imgName, pathImgOld);
    throw error;
  }
}

module.exports = {
  uploadSingleFile,
  uploadManyFile,
};
