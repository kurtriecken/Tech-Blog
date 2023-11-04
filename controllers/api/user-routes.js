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