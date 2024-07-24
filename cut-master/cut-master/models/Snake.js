const mongoose = require('mongoose');

const Snake = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('snake', Snake);
