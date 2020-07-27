const { Router } = require('express');

const fileUpload = require('express-fileupload');
const { ValidExistFiles, UploadSingleFile } = require('../middleware/validationFiles.guard');

const { isAuth } = require('../middleware/auth.guard.js');
// const { isAdmin, isUser } = require('../middleware/validRole.guard.js');
const UploadController = require('../controllers/upload.controller.js');

const upload_router = Router();

// upload_router.use(isAuth, fileUpload());

upload_router.use(isAuth);

upload_router.use(
  fileUpload({
    createParentPath: true, // crea el las rutas automaticamente
    safeFileNames: true, // elimina caracteres especiales de los nombres
    preserveExtension: 4, // define la cantidad de caracteres de la extension
  })
);

upload_router.post('/:type/:id', [ValidExistFiles, UploadSingleFile], UploadController.uploadSingleFile);

module.exports = upload_router;
