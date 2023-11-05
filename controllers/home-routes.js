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
                    attributes: ['username'],
                },
            ],
        });

        // Serialize the data so the template can read it
        const blogposts = blogpostData.map((bp) => bp.get({ plain: true }));

        res.render('homepage', {
            blogposts,
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
            attributes: { exclude: ['password'] }
        });

        const user = userData.get({ plain: true });
        // console.trace('Im in here now Peepes');
        res.render('profile', {
            ...user,
            logged_in: true
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