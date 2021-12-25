const mongoose = require('mongoose');

const jpoSchema = mongoose.Schema({
  date: String,
  center_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'centers',
    default: null,
  },
  volunteers_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'volunteers',
      default: null,
    },
  ],
});

const Jpo = mongoose.model('jpos', jpoSchema);

module.exports = Jpo;
