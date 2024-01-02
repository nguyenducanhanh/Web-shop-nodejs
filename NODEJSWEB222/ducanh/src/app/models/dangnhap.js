const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dangnhapSchema = new Schema({
    tendangnhap: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' } 
});

module.exports = mongoose.model('dangnhaps', dangnhapSchema);


