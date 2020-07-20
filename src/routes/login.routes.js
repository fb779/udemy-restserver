const { Router } = require('express');
const LoginController = require('../controllers/login.controller.js');

const login_router = Router();

login_router.post('/login', LoginController.login);

module.exports = login_router;
