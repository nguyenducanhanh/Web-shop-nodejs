const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lienHeSchema = new Schema({
    email: { type: String },
    phonenumber: { type: String },
});

module.exports = mongoose.model('lienhes', lienHeSchema);
