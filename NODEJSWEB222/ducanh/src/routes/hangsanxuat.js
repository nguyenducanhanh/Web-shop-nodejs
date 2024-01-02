const express = require('express');
const router = express.Router();
const manufacturer = require('../app/controllers/HangsanxuatController');
const authMiddleware = require('../app/middlewares/checkAdmin');


// Thêm route để hiển thị danh sách sản phẩm theo hãng
router.get('/:id', manufacturer.productsByManufacturer);
router.use(authMiddleware.requireAuth);                    // nhảy ra trang báo không có quyền 
router.get('/admin/create', manufacturer.create);
router.post('/store',  manufacturer.store);
router.get('/:id/edit', manufacturer.edit);
router.put('/:id', manufacturer.updateWithErrorHandling);
router.delete('/:id', manufacturer.delete);

module.exports = router


