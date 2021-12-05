const router = require('express').Router();

const homeRoutes = require('../home-routes');
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
const friendRoutes = require('./friend-routes');

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/friends', friendRoutes);

module.exports = router;

