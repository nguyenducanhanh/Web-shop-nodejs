const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({

  name: String, // Tên sản phẩm
  productId: mongoose.Schema.Types.ObjectId, // ID của sản phẩm
  quantity: Number, // Số lượng sản phẩm đặt
  price: String,
  subtotal : Number,
});

const orderSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  nameKH: {
    type: String,
    required: true,
  },
  sdtKH: {
    type: String,
    required: true,
  },
  products: [orderItemSchema], // Sử dụng mảng để lưu các sản phẩm đã đặt
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
