const express = require('express');
const router = express.Router();
const cart = require('../app/controllers/cartController');
const authMiddleware = require('../app/middlewares/checkKhachHang');
router.use(authMiddleware.requireAuth);                    // nhảy ra trang báo không có quyền 
// Sử dụng phương thức POST để thêm sản phẩm vào giỏ hàng
router.post('/products/:productId', cart.addToCart);
// Trong tệp cấu hình tuyến đường (app.js hoặc tệp tương tự)
router.get('/cart/remove/:productId', cart.removeFromCart);

// Sử dụng phương thức GET để xem giỏ hàng
router.get('/', cart.getCart);

// Sử dụng phương thức POST để cập nhật số lượng sản phẩm trong giỏ hàng
router.post('/cart/update/:productId', cart.updateCartItem);

module.exports = router;
