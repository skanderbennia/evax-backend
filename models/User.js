const mongoose = require('mongoose');

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    address: {
      type: String,
      required: false,
      min: 6,
      max: 1024,
    },
    phone: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    registry_mode: {
      type: Boolean,
      required: true,
    },
    type_vaccin: {
      type: String,
      required: false,
      default: 'none',
      min: 6,
      max: 1024,
    },
    first_dose: {
      type: String,
      default: 'none',
    },
    second_dose: {
      type: String,
      default: 'none',
    },
    role: {
      type: String,
      required: true,
      default: 'basic',
      enum: ['basic', 'operator', 'admin'],
    },
  })
);

module.exports = User;
