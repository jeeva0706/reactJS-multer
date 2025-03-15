const mongoose = require('mongoose');

const ImageValueSchema = new mongoose.Schema({
  image: { type: String, required: true }
});

module.exports = mongoose.model('Image', ImageValueSchema);
