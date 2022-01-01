const mongoose = require('mongoose');

const Password = mongoose.model(
  'Password',
  new mongoose.Schema({
    value: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, expires: '10m', default: Date.now },
  })
);
module.exports = Password;
