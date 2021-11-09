const mongoose = require('mongoose');

const volunteerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  age: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  phoneNumber: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },

  cin: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  operator: {
    type: Boolean,
    required: true,
  
  },
  
  volunteer_team: {
    type: String,
    required: true,
    default:'Tunisian Red Crescent',
    enum: ['Tunisian Red Crescent', 'Tunisian Scouts', 'Associamed'],
  },
});

const   Volunteer = mongoose.model('volunteer', volunteerSchema);

module.exports = Volunteer;
