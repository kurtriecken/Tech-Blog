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

router.get('*', async (req, res) => {
    try {
        res.render('404');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;