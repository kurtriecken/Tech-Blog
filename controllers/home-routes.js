const router = require('express').Router();

// ROUTE: /

router.get('/', async (req, res) => {
    try {
        res.render('homepage');
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