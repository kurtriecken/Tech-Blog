const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const bpRoutes = require('./blog-post-routes.js');
const commentRoutes = require('./comment-routes.js');

router.use('/users', userRoutes);
router.use('/blogposts', bpRoutes);
router.use('/comments', commentRoutes);

module.exports = router;