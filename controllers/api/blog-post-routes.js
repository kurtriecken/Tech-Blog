const router = require('express').Router();
const { BlogPost } = require('../../models');

// ROUTE: /api/blogposts

// GET all BlogPosts
router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll();

        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET BlogPost by id
router.get('/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id);

        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;