const mongoose = require('mongoose');

const operatorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    tel: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    cin: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
});

const Operator = mongoose.model('operators', operatorSchema);

module.exports = Operator;
