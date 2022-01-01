const mongoose = require('mongoose');

const citizenSchema = mongoose.Schema({
  registry_mode: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  password: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Password',
    default: null,
  },
});

const Citizen = mongoose.model('citizens', citizenSchema);

module.exports = Citizen;
