const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SECRET = "mysecretkey";

// SIGNUP
router.post('/signup', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: "User created" });
});

// LOGIN
router.post('/login', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid user" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    SECRET
  );

  res.json({ token });
});

module.exports = router;