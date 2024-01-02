const Lienhe = require('../models/Lienhe')
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class LienhesController {


    // hiển thị trang liên hệ ở trang công khai
    lienhe(req, res, next) {
        Lienhe.find({})
            .then((lienhes) => {
                res.render('lienhes',{
                    lienhes: mutipleMongooseToObject(lienhes),
                    title: 'contact ' 
                });
            })
            .catch(next);
    }



    // hiển thị trang sửa 
    edit(req, res, next) {
        Lienhe.findById(req.params.id)
            .then((lienhe) =>
                res.render('lienhes/edit', {
                    lienhe: mongooseToObject(lienhe),title: 'update product' 
                }),
            )
            .catch(next);
    }

    update(req, res, next) {
        Lienhe.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/adminshow/lienhes'))
            .catch(next);
    }



}
module.exports = new LienhesController;
