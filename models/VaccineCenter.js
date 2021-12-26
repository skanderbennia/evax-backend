const mongoose = require('mongoose');

const vaccinecenterSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
    min: 6,
    max: 255,
  },
  vaccine_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vaccines',
    default: null,
  },
  center_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'centers',
    default: null,
  },
});

const VaccineCenter = mongoose.model('vaccinecenter', vaccinecenterSchema);

module.exports = VaccineCenter;
