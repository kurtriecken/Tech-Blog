const router = require('express').Router();
const { Comment } = require('../../models');

// ROUTE: /api/comments

// GET all Comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET Comment by id
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE new Comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            content: req.body.content,
            date_created: req.body.date_created,
            user_id: req.body.user_id,
            blog_post_id: req.body.blog_post_id,
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE Comment by id
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: "No comment found with that ID!" });
            return;
        };

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;