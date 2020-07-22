const { Router } = require('express');
const { isAuth } = require('../middleware/auth.guard.js');
const { isAdmin, isUser } = require('../middleware/validRole.guard.js');
const CategoryController = require('../controllers/category.controller.js');

const category_router = Router();

category_router.use(isAuth);

category_router.get('/:id', CategoryController.getCategory);

category_router.get('', CategoryController.getListCategory);

category_router.post('', [], CategoryController.createCategory);

category_router.put('/:id', [], CategoryController.updateCategory);

category_router.delete('/:id', [isAdmin], CategoryController.deleteCategory);

module.exports = category_router;
