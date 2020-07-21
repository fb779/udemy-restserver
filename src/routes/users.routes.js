const { Router } = require('express');
const { isAuth } = require('../middleware/auth.guard.js');
const { isAdmin, isUser } = require('../middleware/validRole.guard.js');
const UserController = require('../controllers/users.controller.js');

const user_router = Router();

user_router.use(isAuth);

user_router.get('/:id', UserController.getUser);

user_router.get('', UserController.getListUser);

user_router.post('', [isAdmin], UserController.createUser);

user_router.put('/:id', [isAdmin], UserController.updateUser);

user_router.delete('/:id', [isAdmin], UserController.deleteUser);

module.exports = user_router;
