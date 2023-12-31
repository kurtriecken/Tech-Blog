const router = require('express').Router();
const { User } = require('../../models');

// ROUTE: /api/users

// GET all Users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login to a user
router.post('/login', async (req, res) => {
  //DO THIS
  try {
    // console.trace('HERE I AM');
    // console.log(req.body);
    const userData = await User.findOne({ where: { username: req.body.username } });
    // console.log(userData.toJSON());
    if (!userData) {
      res.status(400).json({ mesage: 'Incorrect username or password, please try again!'});
      return;
    }

    console.log(req.body.password);

    const validPassword = await userData.checkPassword(req.body.password);
    console.log(`password is valid: ${validPassword}`);


    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Log out of a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// GET one User by id
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE new User
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    console.trace(userData);

    // const user = userData.get({ plain: true });

    res.status(200).json(userData);
    
  } catch (err) {
    res.status(500).json(err);    
  }
});

// DELETE User by id
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: "No user found with that ID!" });
      return;
    };

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;