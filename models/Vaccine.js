const mongoose = require('mongoose');

const vaccineSchema = mongoose.Schema({
  label: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
});

const Vaccine = mongoose.model('vaccines', vaccineSchema);

module.exports = Vaccine;