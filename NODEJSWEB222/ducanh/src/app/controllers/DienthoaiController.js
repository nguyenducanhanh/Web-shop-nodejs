const Dienthoai = require('../models/Dienthoai');
const Hangsanxuat = require('../models/Hangsanxuat');
const { mongooseToObject } = require('../../util/mongoose');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class DienthoaiController {

   

//hiển thị trang tạo mới
    create(req, res, next) {
        Hangsanxuat.find({}, 'name')                   // name lấy data từ bẳng hãng sản xuất 
            .then((hangsanxuats) => {
                res.render('dienthoais/create', {
                    title: 'more',
                    hangsanxuats: hangsanxuats.map(hsx => hsx.toObject())                // xử lý chọn hãng sản xuất cho sản phẩm khi thêm mới
                });
            })
            .catch(next);
    }
    
    //xử lý việc lưu trữ điện thoại mới     
    store(req, res, next) {
        const formData = req.body;
        formData.image = req.file.path.substring(19);  
        // Kiểm tra xem tên hoặc slug đã tồn tại chưa
        Dienthoai.findOne({ $or: [{ name: formData.name }, { slug: formData.slug }] })
            .then(existingProduct => {
                if (existingProduct) {
                    // Kiểm tra xem tên có trùng không
                    if (existingProduct.name === formData.name) {
                        return res.status(400).json({ error: 'Tên này đã tồn tại. Vui lòng chọn một tên khác ' });
                    } 
                    // Kiểm tra xem slug có trùng không
                    if (existingProduct.slug === formData.slug) {
                        return res.status(400).json({ error: 'Slug này đã tồn tại. Vui lòng chọn một slug khác ' });
                    }
                }     
                // Nếu không trùng, tiếp tục với quá trình lưu trữ
                const dienthoai = new Dienthoai(formData);
                dienthoai.save()
                    .then(() => res.redirect('/adminshow/dienthoais'))
                    .catch(error => { });
            })
            .catch(err => { });
    }
    
    //để hiển thị trang chỉnh sửa
    edit(req, res, next) {
        Promise.all([
            Dienthoai.findById(req.params.id),
            Hangsanxuat.find({}, 'name')
        ])
        .then(([dienthoai, hangsanxuats]) => {
            res.render('dienthoais/edit', {
                dienthoai: mongooseToObject(dienthoai),
                title: 'update',
                hangsanxuats: hangsanxuats.map(hsx => hsx.toObject())
            });
        })
        .catch(next);
    }
   // để cập nhật thông tin sản phẩm
    update(req, res, next) {
        Dienthoai.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/adminshow/dienthoais'))
            .catch(next);
    }
    
   

    delete(req, res, next) {
        Dienthoai.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }


    // chi tiet sản phẩm
    async productdetail(req, res, next) {
        const dienthoai = await Dienthoai.findOne({ slug: req.params.slug });
        const hangsanxuat = await Hangsanxuat.findById(dienthoai.HangSX);

        res.render('productdetail', {
            dienthoai: mongooseToObject(dienthoai),
            hangsanxuat: mongooseToObject(hangsanxuat),
            title: 'product detail',
        });
    }
 }

module.exports = new DienthoaiController();