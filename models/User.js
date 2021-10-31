const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
});
const User = mongoose.model('users', userSchema);

module.exports = User;
