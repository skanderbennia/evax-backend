const mongoose = require('mongoose');

const Password = mongoose.model(
  'Password',
  new mongoose.Schema({
    value: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, expires: '2m', default: Date.now },
  })
);
module.exports = Password;
