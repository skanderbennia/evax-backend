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
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});
const Appointement = mongoose.model('UniYear', appointementSchema);

module.exports = Appointement;
