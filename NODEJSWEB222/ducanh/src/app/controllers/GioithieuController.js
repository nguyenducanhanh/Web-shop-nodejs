const Dienthoai = require('../models/Dienthoai');


class GioiThieuController {

    index(req, res, next) {      
                res.render('gioithieu', {
                    title: 'introduce '
                });        
    }
}
module.exports = new GioiThieuController;
