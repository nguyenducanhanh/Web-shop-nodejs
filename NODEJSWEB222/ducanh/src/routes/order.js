const express = require('express');
const router = express.Router();
const order = require('../app/controllers/orderController');

const authMiddleware = require('../app/middlewares/checkAdmin');

router.post('/checkout', order.checkout); // Xử lý thanh toán
router.get('/success', order.success); // Xử lý thanh toán
router.use(authMiddleware.requireAuth);                    // nhảy ra trang báo không có quyền 
router.delete('/:id', order.deleteOrder);
router.get('/:id', order.getOrderDetails); // Thêm route để lấy thông tin chi tiết của hóa đơn

module.exports = router


