const withAuth = require('../utils/auth');
const { User, BlogPost } = require('../models');
const router = require('express').Router();

// ROUTE: /

router.get('/', async (req, res) => {
    try {
        // Get all blogposts and join with User data
        const blogpostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                },
            ],
        });

        // Serialize the data so the template can read it
        const blog_posts = blogpostData.map((bp) => bp.get({ plain: true }));

        res.render('homepage', {
            blog_posts,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    // If user is logged in, redirect to their profile
    // BUILD THIS OUT
    if (req.session.logged_in) {
        // BUILD THIS
        res.redirect('/profile');
        return;
    }
    else {
        // Send them to the login page
        res.render('login');
    }
});

router.get('/signup', async (req, res) => {
        // Send them to the signup page
        // You shouldn't be able to get here except through clicking the 
        // "signup" button on the homepage or login screen
        res.render('signup');
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        // console.trace('Im in here now people');
        // console.log(req.session);

        // Find who is logged in based on session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: BlogPost }],
        });

        const user = userData.get({ plain: true });
        console.trace(user);
        res.render('profile', {
            ...user,
            logged_in: true
        });

    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/newpost', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }
        });

        const user = userData.get({ plain: true });
        // console.trace('Im in here now Peepes');
        res.render('newpost', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

// CREATE A ROUTE to send to a page with just 1 blogpost
// Here, users can add a comment to the blog post
// It should style the same as the home page
router.get('/blogpost/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password'],
                    },
                },
            ],
        });

        const blog_posts = blogPostData.get({ plain: true });
        console.trace(blog_posts)

        res.render('singlepost', {
            ...blog_posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('*', async (req, res) => {
    try {
        res.render('404');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;