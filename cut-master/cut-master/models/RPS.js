const mongoose = require('mongoose');

const RPSScore = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  wins: {
    type: Number,
    required: true,
  },
  losses: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('rps', RPSScore);
