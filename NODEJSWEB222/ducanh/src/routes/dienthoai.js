const express = require('express');
const router = express.Router();
const dienthoai = require('../app/controllers/DienthoaiController');
const authMiddleware = require('../app/middlewares/checkAdmin');

router.get('/:slug', dienthoai.productdetail);

router.use(authMiddleware.requireAuth);                    // nhảy ra trang báo không có quyền 
router.get('/admin/create', dienthoai.create);                          // GET : Đọc  
const multer = require('multer');          // dùng cho việc tải lên các tệp tin               
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));      //      path.extname(file.originalname) đặt tên cho tệp mới
    }
});
const upload = multer({ storage });
router.post('/store', upload.single('image'), dienthoai.store);             // POST : thêm
router.get('/:id/edit', dienthoai.edit);                           
router.put('/:id', dienthoai.update);                                            // PUT : sửa
router.delete('/:id', dienthoai.delete);

module.exports = router