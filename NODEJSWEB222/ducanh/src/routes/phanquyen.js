const express = require('express');
const router = express.Router();
const phanquyen = require('../app/controllers/PhanquyenController');
const authMiddleware = require('../app/middlewares/checkAdmin');

router.use(authMiddleware.requireAuth);                    // nhảy ra trang báo không có quyền 
router.get('/:id/edit', phanquyen.edit);
router.put('/:id', phanquyen.update);
router.delete('/:id', phanquyen.delete);

module.exports = router


