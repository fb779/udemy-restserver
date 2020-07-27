const { Router } = require('express');
const { errorHanddler } = require('../middleware/errors.guard.js');
const loginRoutes = require('./login.routes.js');
const usersRoutes = require('./users.routes.js');
const categoryRoutes = require('./category.routes.js');
const productRoutes = require('./product.routes.js');
const uploadRoutes = require('./upload.routes.js');
const imagesRoutes = require('./images.routes.js');

const router = Router();

router.use('/auth', loginRoutes);
router.use('/users', usersRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/upload', uploadRoutes);
router.use('/images', imagesRoutes);

router.use(errorHanddler);

module.exports = router;
