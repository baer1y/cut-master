const mongoose = require('mongoose');

const Ttt = mongoose.Schema({
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

module.exports = mongoose.model('ttt', Ttt);
