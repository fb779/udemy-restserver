const path = require('path');
const fs = require('fs');
const { uploadDir, noImagePath } = require('../config/config.js');
const { validTypes } = require('../helper/upload.helper.js');

async function showImages(req, res, next) {
  try {
    const type = req.params.type;
    const img = req.params.img;

    if (!validTypes(type)) {
      throw { status: 400, ok: false, message: 'The type is not valid' };
    }

    const imgPath = path.resolve(`${uploadDir}/${type}/${img}`);

    if (fs.existsSync(imgPath)) {
      res.sendFile(path.resolve(imgPath));
    } else {
      res.sendFile(path.resolve(noImagePath));
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  showImages,
};
