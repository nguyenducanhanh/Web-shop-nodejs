const express = require('express');
const router = express.Router();
const Dangnhap = require('../app/models/dangnhap');

router.get('/dangnhap', (req, res) => {
    res.render('dangnhapp', { title: 'Sign in' });
});
// xử lý đăng nhập 
router.post('/dangnhap', async (req, res) => {
    const { tendangnhap, password } = req.body;
    // Kiểm tra xác thực người dùng (thay đổi theo ứng dụng của bạn)
    const dangnhap = await Dangnhap.findOne({ tendangnhap });
    if (!dangnhap || dangnhap.password !== password) {
      //  res.status(401).send('Tên đăng nhập hoặc mật khẩu không đúng.');
        return res.status(401).send('<span style="color: red;font-size:200px">Username or password is wrong.</span>');
    } else {
        req.session.isLoggedIn = true;
        if (dangnhap.role === 'customer') {
            req.session.isAuthenticatedd = true;            
            res.redirect('/');                                      // là khách thì ra trang home 
        } else if (dangnhap.role === 'admin') {
            req.session.isAuthenticated = true;           
            res.redirect('/adminshow/dienthoais');                  // là admin thì ra trang admin 
        }
    }
});

router.get('/dangky', (req, res) => {
    res.render('dangkyy', { title: 'Sign up' });
});

router.post('/dangky', async (req, res) => {
    if (req.session.isAdmin) {
        res.status(403).send('Bạn không có quyền đăng ký.');
    } else {
        const data = {
            tendangnhap: req.body.tendangnhap,
            password: req.body.password
        };
        const existingdangnhap = await Dangnhap.findOne({ tendangnhap: data.tendangnhap });
        if (existingdangnhap) {
            res.status(400).send('<span style="color: red;font-size:200px">Tên đăng nhập đã tồn tại.</span>');
       
        } else {
            await Dangnhap.insertMany([data]);
            res.redirect('/taikhoan/dangnhap');
        }
    }
});



// Đăng xuất
router.post('/dangxuat', (req, res) => {
    // Xóa phiên đăng nhập
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
        }
        // Chuyển hướng về trang đăng nhập sau khi đăng xuất
        res.redirect('/taikhoan/dangnhap');
    });
});


module.exports = router;
