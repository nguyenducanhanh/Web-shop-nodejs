const Dienthoai = require('../models/Dienthoai');
const Phanquyen = require('../models/dangnhap');
const Hangsanxuat = require('../models/Hangsanxuat');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const Lienhe = require('../models/Lienhe');

const Order = require('../models/Order');
class AdminShowController {


    async storedDienthoais(req, res, next) {
        const perPage = 5;
        const page = req.query.page || 1;

        try {
            const options = {
                page: page,
                limit: perPage,
                populate: { path: 'HangSX', model: Hangsanxuat }, // Thêm model để đăng ký trước khi sử dụng
            };

            const result = await Dienthoai.paginate({}, options);

            res.render('adminshow/dienthoais', {
                dienthoais: mutipleMongooseToObject(result.docs),
                current: result.page,
                pages: result.totalPages,
                title: 'Admin - product list',
            });
        } catch (err) {
            next(err);
        }
    }
    

    
   
    
    
    storedLienhes(req, res, next) {
        Lienhe.find({})
         .then(lienhes =>
                res.render('adminshow/lienhes', {             
                    lienhes: mutipleMongooseToObject(lienhes),  title: 'Admin - contact list ' 
                })
            )
            .catch(next);
    }

  

    storedOrders(req, res, next) {
        Order.find({})
         .then(orders =>
                res.render('adminshow/orders', {             
                    orders: mutipleMongooseToObject(orders),  title: 'Admin - order list  ' 
                })
            )
            .catch(next);
    }


    async storedPhanquyens(req, res, next) {
        Phanquyen.find({})
         .then(phanquyens =>
                res.render('adminshow/phanquyens', {             
                    phanquyens: mutipleMongooseToObject(phanquyens),  title: 'Admin - account list' 
                })
            )
            .catch(next);
    }



    async storedHangsanxuats(req, res, next) {
        Hangsanxuat.find({})
         .then(hangsanxuats =>
                res.render('adminshow/hangsanxuats', {             
                    hangsanxuats: mutipleMongooseToObject(hangsanxuats),  title: 'Admin - manufacturer list' 
                })
            )
            .catch(next);
    }

  

}
module.exports = new AdminShowController();