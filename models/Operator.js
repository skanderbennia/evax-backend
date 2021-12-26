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
});

const Operator = mongoose.model('operators', operatorSchema);

module.exports = Operator;
