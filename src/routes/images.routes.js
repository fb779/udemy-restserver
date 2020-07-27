// Inicialización
const express = require('express');
const path = require('path');
const { uploadDir } = require('../config/config.js');
const { isAuth } = require('./../middleware/auth.guard.js');
const ImagesController = require('../controllers/images.controller.js');

const images_router = express.Router();

/********************************************************
 * Static Files
 ********************************************************/

/**
 * Presentacion de imagenes con middleware static
 */
// images_router.use('/user', [isAuth], express.static(path.resolve(uploadDir, 'users')));
// images_router.use('/product', [isAuth], express.static(path.resolve(uploadDir, 'products')));

images_router.use(isAuth);
images_router.get('/:type/:img', [], ImagesController.showImages);

module.exports = images_router;
