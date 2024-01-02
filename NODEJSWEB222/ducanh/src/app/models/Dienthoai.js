const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2'); // Import thư viện
const Hangsanxuat = require('../models/Hangsanxuat');
const Schema = mongoose.Schema;
const Dienthoai = new Schema(
    {
        name: { type: String, required: true },
        ThongTin: { type: String },
        image: { type: String },
        GiaCu: {type: String },
        GiaMoi: {type: String },   
   HangSX: { type: Schema.Types.ObjectId, ref: 'Hangsanxuat', required: true },
     
       slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    }
);



Dienthoai.plugin(mongoosePaginate); // Sử dụng plugin để phân trang
module.exports = mongoose.model('dienthoais', Dienthoai);