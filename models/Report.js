const mongoose = require('mongoose');

const Report = mongoose.model(
  'Report',
  new mongoose.Schema({
    nb_doze: Number,
    vaccin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vaccines',
      default: null,
    },
    appointement_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'appointments',
      default: null,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  })
);

module.exports = Report;
