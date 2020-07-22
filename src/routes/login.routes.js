const { Router } = require('express');
const LoginController = require('../controllers/login.controller.js');

const login_router = Router();

login_router.post('/login', LoginController.login);

login_router.post('/google-singin', LoginController.loginGoogle);

module.exports = login_router;
