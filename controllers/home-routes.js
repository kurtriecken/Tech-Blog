const withAuth = require('../utils/auth');
const { User } = require('../models');
const router = require('express').Router();

// ROUTE: /

router.get('/', async (req, res) => {
    try {
        res.render('homepage');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    // If user is logged in, redirect to their profile
    // BUILD THIS OUT
    if (req.session.logged_in) {
        // BUILD THIS
        res.render('homepage');
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
        // Find who is logged in based on session ID
        const userData = await User.findByPk(req.session.use_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: BlogPost }],
        });

        const user = userData.get({ plain: true });
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