const mongoose = require('mongoose');

const Video = mongoose.Schema({
  game: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('videos', Video);
