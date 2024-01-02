const Order = require('../models/Order'); 
const { mongooseToObject } = require('../../util/mongoose');

class OrderController {
  success(req, res, next) {      
        res.render('success', {
            title: 'thành công  '
        });        
    }

  async checkout(req, res) {
    try {
      const { address } = req.body;
      const { sdtKH } = req.body;
      const { nameKH } = req.body;
      const cartContents = req.session.cart || [];

      // Tạo một đối tượng Order với thông tin địa chỉ và sản phẩm
      const orderItems = cartContents.map(item => ({
         price: item.price,
        name: item.name,
        productId: item.productId,
        quantity: item.quantity,
        subtotal: item.subtotal,
      }));

      const order = new Order({
        address,
        sdtKH,
        nameKH,
         products: orderItems,
      });
      // Lưu đơn hàng vào cơ sở dữ liệu
      await order.save();

      // Xóa giỏ hàng sau khi đặt hàng
      req.session.cart = [];

      // Redirect hoặc hiển thị thông báo thanh toán thành công
      res.redirect('success'); // Điều hướng đến trang thanh toán thành công
    } catch (error) {
      console.error('Lỗi khi xử lý thanh toán:', error);
      res.status(500).send('Lỗi khi xử lý thanh toán.');
    }
  }

deleteOrder(req, res, next) {
  Order.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
}


async getOrderDetails(req, res, next) {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    
    if (!order) {
      res.status(404).send('Order not found');
      return;
    }

    res.render('order-details', {
      title: 'Order Details',
      order: mongooseToObject(order),
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).send('Error fetching order details.');
  }
}

}

module.exports = new OrderController();
