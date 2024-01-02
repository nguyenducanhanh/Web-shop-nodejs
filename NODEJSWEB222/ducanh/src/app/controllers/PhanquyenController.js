const Phanquyen = require('../models/dangnhap');
const { mongooseToObject } = require('../../util/mongoose');
class PhanquyenController {



    edit(req, res, next) {
        Phanquyen.findById(req.params.id)
            .then((phanquyen) =>
                res.render('phanquyens/edit', {
                    phanquyen: mongooseToObject(phanquyen),title: 'update' 
                }),
            )
            .catch(next);
    }
    
    update(req, res, next) {
        Phanquyen.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/adminshow/phanquyens'))              // về lại trang hiển thị danh sach tai khoan
            .catch(next);
    }
 
           

    delete(req, res, next) {
        Phanquyen.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

}

module.exports = new PhanquyenController();