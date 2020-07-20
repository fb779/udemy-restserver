const { Router } = require('express');
const { errorHanddler } = require('../middleware/errors.js');
const loginRoutes = require('./login.routes.js');
const usersRoutes = require('./users.routes.js');

const router = Router();

router.use('/auth', loginRoutes);
router.use('/users', usersRoutes);

router.use(errorHanddler);

module.exports = router;
