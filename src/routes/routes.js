const { Router } = require('express');
const { errorHanddler } = require('../middleware/errors.js');
const usersRoutes = require('./users.routes.js');

const router = Router();

router.use('/users', usersRoutes);

router.use(errorHanddler);

module.exports = router;
