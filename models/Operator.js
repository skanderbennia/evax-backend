const mongoose = require('mongoose');

const operatorSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  center_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'center',
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
});

const Operator = mongoose.model('operators', operatorSchema);

module.exports = Operator;
