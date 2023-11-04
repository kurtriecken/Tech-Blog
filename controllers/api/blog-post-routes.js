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

// CREATE new BlogPost
router.post('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.create({
            title: req.body.title,
            content: req.body.content,
            date_created: req.body.date_created,
            user_id: req.body.user_id
        });

        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE BlogPost by ID
router.put('/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.update(
            {
                title: req.body.title,
                content: req.body.content,
                date_created: req.body.date_created,
                user_id: req.body.user_id
            },
            {
                where: {
                    id: req.params.id,
                }
            }
        );

        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE BlogPost by id
router.delete('/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!blogPostData) {
            res.status(404).json({ message: "No blog post found with that ID!" });
            return;
        };

        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;