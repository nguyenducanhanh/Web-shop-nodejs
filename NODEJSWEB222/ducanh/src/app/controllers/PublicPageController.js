const Dienthoai = require('../models/Dienthoai');
const express = require('express');
const Hangsanxuat = require('../models/Hangsanxuat');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class PublicPageController {

    async index(req, res, next) {
        const perPage = 6; 
        const page = req.query.page || 1; 
        try {
             // Lấy danh sách hãng sản xuất
        const hangsanxuats = await Hangsanxuat.find({}, 'name');

            const options = {
                page: page,
                limit: perPage,
            };
            const dienthoais = await Dienthoai.paginate({}, options);
            res.render('home', {
                dienthoais: mutipleMongooseToObject(dienthoais.docs), 
                hangsanxuats: mutipleMongooseToObject(hangsanxuats),
                current: dienthoais.page,
                pages: dienthoais.totalPages,
                title: 'home',
            });
        } catch (err) {
            next(err);
        }
    }


 
    
    searchByName(req, res, next) {
        const searchKeyword = req.query.q;
        Dienthoai.find({ name: { $regex: new RegExp(searchKeyword, 'i') } })
            .then((dienthoais) => {
                res.render('search', {
                    dienthoais: mutipleMongooseToObject(dienthoais), title: 'search '
                });
            })
            .catch(next);
    }

  // Liên hệ đã viết thẳng ở LienheController.js rồi 

    

}
module.exports = new PublicPageController;
