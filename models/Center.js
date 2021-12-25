const mongoose = require('mongoose');

const centerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  address: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  jpo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jpo',
    default: null,
  },
});

const Center = mongoose.model('centers', centerSchema);

module.exports = Center;
