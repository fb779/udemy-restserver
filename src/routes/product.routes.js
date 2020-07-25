const { Router } = require('express');
const { isAuth } = require('../middleware/auth.guard.js');
// const { isAdmin, isUser } = require('../middleware/validRole.guard.js');
const ProductController = require('../controllers/product.controller.js');

const product_router = Router();

product_router.use(isAuth);

product_router.get('/search/:term', ProductController.findProduct);

product_router.get('/:id', ProductController.getProduct);

product_router.get('', ProductController.getListProduct);

product_router.post('', [], ProductController.createProduct);

product_router.put('/:id', [], ProductController.updateProduct);

product_router.delete('/:id', [], ProductController.deleteProduct);

module.exports = product_router;
