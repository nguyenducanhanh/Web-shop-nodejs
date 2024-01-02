const khongcoquyen = require('./khongcoquyen');
const lienhes = require('./lienhes');
const adminshow = require('./adminshow');
const dienthoais = require('./dienthoai');
const hangsanxuats = require('./hangsanxuat');
const phanquyens = require('./phanquyen');
const publicpage = require('./publicpage');
const gioithieu = require('./gioithieu');
const cartRoutes = require('./cartRoutes');
const orders = require('./order');
const taikhoan = require('./taikhoan');

function route(app) {
    app.use('/lienhes', lienhes)
    app.use('/error', khongcoquyen)
    app.use('/adminshow', adminshow)
    app.use('/', publicpage)
    app.use('/dienthoais', dienthoais)
    app.use('/hangsanxuats', hangsanxuats)
    app.use('/phanquyens', phanquyens)
    app.use('/gioithieu',gioithieu);
    app.use('/cartRoutes',cartRoutes);
    app.use('/orders', orders); 
    app.use('/taikhoan',  taikhoan);

} 
module.exports = route;