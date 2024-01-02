module.exports = {
    requireAuth: (req, res, next) => {
       if (req.session.isAuthenticatedd) {                   //  router/dangnhap.js  req.session.isAuthenticatedd = true; 
         next();
      } else {
         res.redirect('/taikhoan/dangnhap')  ;              // đẩy ra trang đăng nhập khi ko có quyền 
      }
    },
  };
  