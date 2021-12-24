const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  date: {
    type: String,
    required: [true],
  },
  time: {
    type: String,
    required: [true],
  },
  center_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'center',
    default: null,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
});
const Appointment = mongoose.model('appointments', appointmentSchema);

module.exports = Appointment;
