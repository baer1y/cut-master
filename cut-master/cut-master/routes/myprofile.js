const express = require('express');
const router = express.Router();
const USER = require('../models/USER');

router.get('/', async (req, res) => {
  res.render('myprofile', {
    user: await USER.findOne({ email: req.session.Email }),
  });
});

router.post('/update', async (req, res) => {
  const { name, city, password, email, png_src } = req.body;

  const user = await USER.findOne({ email: email });

  console.log(user);

  if (user) {
    if (name) user.name = name;
    if (password) user.password = password;
    if (city) user.city = city;
    if (png_src) user.png_src = png_src;

    await user.save();
    res.status(200);
  } else {
    res.status(400);
    res.send('User is not found');
  }
});

module.exports = router;
