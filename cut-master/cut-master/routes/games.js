const express = require('express');
const session = require('express-session');
const router = express.Router();
const isAuth = require('../config/isAuth');
const USER = require('../models/USER');

const RPSScore = require('../models/RPS');
const TTTScore = require('../models/TTT');
const Snake = require('../models/Snake');
const Video = require('../models/Videos');

router.get('/tick-tack-toe', async (req, res) => {
  const link = await getRandomVideo('ttt');
  const link2 = await getRandomVideo('ttt');
  res.render('T-T-T', {
    video: link,
    video2: link2,
    isAuth: req.session.isAuth,
  });
});

router.get('/rock-paper-scissors', isAuth, async (req, res) => {
  const link = await getRandomVideo('rps');
  const link2 = await getRandomVideo('rps');
  res.render('R-P-S', {
    isAuth: req.session.isAuth,
    video: link,
    video2: link2,
  });
});

router.get('/snake', isAuth, async (req, res) => {
  const link = await getRandomVideo('snk');
  const link2 = await getRandomVideo('snk');
  res.render('snake', {
    isAuth: req.session.isAuth,
    video: link,
    video2: link2,
  });
});

router.get('/city', isAuth, async (req, res) => {
  const link = await getRandomVideo('cty');
  const link2 = await getRandomVideo('cty');
  res.render('city', {
    video: link,
    video2: link2,
    isAuth: req.session.isAuth,
  });
});

router.post('/rps', isAuth, async (req, res) => {
  console.log('dsda');
  const user = await USER.findOne({ email: req.session.Email });
  let score = await RPSScore.findOne({ user: req.session.Email });
  if (!score) {
    const newScore = new RPSScore({
      user: req.session.Email,
      wins: 0,
      losses: 0,
    });
    await newScore.save();
    score = newScore;
  }
  const { result } = req.body;
  console.log(req.body);
  try {
    if (result === 'win') {
      score.wins += 1;
      score.save();
      console.log('added win');
    } else {
      score.losses += 1;
      score.save();
      console.log('added lose');
    }
    res.status(200);
  } catch (e) {
    res.status(400);
    console.log(e);
  }
  res.redirect('/rock-paper-scissors');
});

router.post('/ttt', isAuth, async (req, res) => {
  let score = await TTTScore.findOne({ user: req.session.Email });
  if (!score) {
    console.log('new');
    const newScore = new TTTScore({
      user: req.session.Email,
      wins: 0,
      losses: 0,
    });
    await newScore.save();
    score = newScore;
  }
  const { result } = req.body;
  console.log(req.body);
  try {
    if (result === 'X') {
      score.wins += 1;
      score.save();
      console.log('added win');
    } else {
      score.losses += 1;
      score.save();
      console.log('added lose');
    }
    res.status(200);
  } catch (e) {
    res.status(400);
    console.log(e);
  }
  res.redirect('/rock-paper-scissors');
});

router.post('/snk', isAuth, async (req, res) => {
  let score = await Snake.findOne({ user: req.session.Email });
  if (!score) {
    console.log('new');
    const newScore = new Snake({
      user: req.session.Email,
      score: 0,
    });
    await newScore.save();
    score = newScore;
  }
  const newSnakeScore = req.body.score;
  console.log(newSnakeScore);
  try {
    if (newSnakeScore > score.score) {
      score.score = newSnakeScore;
      score.save();
    }
    res.status(200);
  } catch (e) {
    res.status(400);
    console.log(e);
  }
  res.redirect('/snake');
});

router.get('/score/:game', async (req, res) => {
  const game = req.params.game;
  const user2 = await USER.findOne({ email: req.session.Email });

  if (game === 'rps') {
    const score = await RPSScore.findOne({ user: req.session.Email });
    if(score){
    res.send({
      user: score.user,
      wins: score.wins,
      losses: score.losses,
    });}
  } else if (game === 'ttt') {
    const score = await TTTScore.findOne({ user: req.session.Email });
    if (score) {
      res.send({
        user: score.user,
        wins: score.wins,
        losses: score.losses,
      });
    }
  } else if (game === 'snake') {
    const score = await Snake.findOne({ user: req.session.Email });
    if (score) {
      res.send({
        user: score.user,
        score: score.score,
      });
    }
  }
});

const getRandomVideo = async (game) => {
  const videos = await Video.find({ game });
  const randomVideo = videos[Math.floor(Math.random() * videos.length)];
  console.log(randomVideo);
  return randomVideo;
};
module.exports = router;
