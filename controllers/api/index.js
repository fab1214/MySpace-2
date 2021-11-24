const router = require('express').Router();
const homeRoutes = require('../home-routes')
const userRoutes = require('./user-routes.js');
router.use('/', homeRoutes);
router.use('/users', userRoutes);

module.exports = router;

