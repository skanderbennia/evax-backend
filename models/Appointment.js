const mongoose = require('mongoose');

const appointementSchema = mongoose.Schema({
  date: {
    type: String,
    required: [true],
  },
  time: {
    type: String,
    required: [true],
  },
  center_id: { type: mongoose.Schema.Types.ObjectId, ref: 'center' },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: null,
  },
});
const Appointement = mongoose.model('appointements', appointementSchema);

module.exports = Appointement;
