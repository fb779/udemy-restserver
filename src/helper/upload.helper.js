const { typesUploads } = require('../config/config.js');
const _ = require('underscore');

// Validacion de las extensiones permitidas
function validExtension(file, extensions = ['image', 'pdf']) {
  return extensions.some((ex) => file.mimetype.includes(ex));
}

// Validacion de las extensiones permitidas
function validTypes(type) {
  const directories = _.values(typesUploads);
  return directories.some((ex) => type === ex);
}

module.exports = {
  validExtension,
  validTypes,
};
