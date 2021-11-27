const router = require('express').Router();
const homeRoutes = require('../home-routes')
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;

