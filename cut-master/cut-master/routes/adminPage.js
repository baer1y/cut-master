const express = require('express');
const app = express();
const router = express.Router();
const USER = require('../models/USER');
const bodyParser = require('body-parser');
const Videos = require('../models/Videos');

const ISAuth = require('../config/isAuth');
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router.get('/admin_page', ISAuth, async (req, res) => {
  const users = await USER.find();

  res.render('admin_page', {
    ErrorsArr: [],
  });
});

router.get('/edit', async (req, res) => {
  const email = req.query.email;
  const user = await USER.findOne({ email: email });
  res.render('userEditing', {
    user: user,
  });
});

router.post(`/edit`, async (req, res) => {
  await USER.findOneAndUpdate(
    { email: req.query.email },
    {
      $set: {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password[0],
        city: req.body.password[1],
      },
    }
  );
  res.redirect('/admin_page');
});

router.get('/delete/:email', async (req, res) => {
  const email = req.params.email;
  const user = await USER.findOne({ email: email });
  await USER.deleteOne({ email: email });
  const users = await USER.find();
  res.redirect('/admin_page');
});

router.get('/', (req, res) => {
  const err = req.flash('error_msg');
  res.render('signup', { err });
});

router.post('/admin_page', async (req, res, next) => {
  let name, email, city, password;
  name = req.body.namecreate;
  email = req.body.emailcreate;
  city = req.body.citycreate;
  password = req.body.passwordcreate;
  let errors = [];

  const newUser = new USER({
    name: name,
    email: email,
    password: password,
    city: city,
    Date: Date.now(),
    Role: 'User',
  });

  newUser.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(newUser);
      return res.redirect('/admin_page');
    }
  });
});

router.get('/admin_page/pag', async (req, res) => {
  var pageNum = parseInt(req.query.pageNum);
  if (isNaN(pageNum)) {
    pageNum = 1;
  }
  if (pageNum === 0) {
    pageNum = 1;
  }
  var size = 5;
  if (pageNum < 0 && size < 0) {
    response = {
      error: true,
      message: 'invalid page number, should start with 1',
    };
    return res.json(response);
  }
  var skip = (pageNum - 1) * size;
  // var users = await USER.find().limit(size).skip(skip).exec();
  const users = await USER.find({})
    .skip((pageNum - 1) * size)
    .limit(size);
  res.json(users);
  console.log(users);
});

router.get('/admin_page/videos', (req, res) => {
  res.render('videos');
});

router.post('/admin_page/videos', async (req, res) => {
  const newVideo = await Videos.create({
    game: req.body.name,
    link: req.body.link,
  });
  newVideo.save();
});

router.get('/admin_page/videos/all', async (req, res) => {
  const videos = await Videos.find();
  res.json(videos);
  console.log(videos);
});

router.get('/admin_page/videos/del', async (req, res) => {
  const id = req.query.id;
  await Videos.findByIdAndDelete(id);
  res.redirect('/admin_page/videos');
});

module.exports = router;
