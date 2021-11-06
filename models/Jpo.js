const mongoose = require('mongoose');

const jpoSchema = mongoose.Schema({
  date: String,
});

const Jpo = mongoose.model('jpos', jpoSchema);

module.exports = Jpo;
