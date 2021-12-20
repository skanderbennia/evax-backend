const mongoose = require('mongoose');

const pharmacySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    address: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    owner: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
},{versionKey:false});

const Pharmacy = mongoose.model('pharmacies', pharmacySchema);

module.exports = Pharmacy;
