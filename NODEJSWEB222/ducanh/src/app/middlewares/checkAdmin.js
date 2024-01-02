module.exports = {
    requireAuth: (req, res, next) => {
       if (req.session.isAuthenticated)                   //   //  router/dangnhap.js  req.session.isAuthenticated = true; 
      {
         next();
      } else {
         res.redirect('/error/khongduocphep')  ;           
          }
    },
  };
  
