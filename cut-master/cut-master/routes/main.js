const express = require('express');
const session = require('express-session');
const router = express.Router();
const isAuth = require('../config/isAuth');
router.get('/', isAuth, (req, res) => {
  res.render('index', {
    isAuth: req.session.isAuth,
  });
});

module.exports = router;
