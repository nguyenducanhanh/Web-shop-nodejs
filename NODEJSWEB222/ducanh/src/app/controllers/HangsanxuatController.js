const Hangsanxuat = require('../models/Hangsanxuat');
const { mongooseToObject } = require('../../util/mongoose');

const Dienthoai = require('../models/Dienthoai');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class HangsanxuatController {

  
// hiển thị trang tạo mới
    create(req, res, next) {
        res.render('hangsanxuats/create',{title: 'more '} ) ;
    }   
//  xử lý việc lưu trữ hãng sản xuất mới
    store(req, res, next) {
        const { name } = req.body;
        // Kiểm tra xem tên đã tồn tại chưa
        Hangsanxuat.findOne({ name })
            .then(existingManufacturer => {
                if (existingManufacturer) {
                    // Nếu đã tồn tại, hiển thị thông báo và chuyển hướng trở lại trang tạo mới
                    res.render('hangsanxuats/create', {
                        title: 'Tạo mới',
                        errorMessage: 'Tên này đã tồn tại. Vui lòng chọn tên khác.',
                    });
                } else {
                    // Nếu chưa tồn tại, tạo mới và chuyển hướng về trang danh sách
                    const newHangsanxuat = new Hangsanxuat({ name });       
                    newHangsanxuat
                        .save()
                        .then(() => res.redirect('/adminshow/hangsanxuats'))
                        .catch(next);
                }
            })
            .catch(next);
    }
    
    // hiển thị trang chỉnh sửa
    edit(req, res, next) {
        Hangsanxuat.findById(req.params.id)
            .then((hangsanxuat) =>
                res.render('hangsanxuats/edit', {
                    hangsanxuat: mongooseToObject(hangsanxuat),title: 'update' ,
                    errorMessage: req.flash('error'), // Flash message for error
                }),
            )
            .catch(next);
    }

    //xử lý việc cập nhật với xử lý lỗi 
    updateWithErrorHandling(req, res, next) {
        Hangsanxuat.findOne({ name: req.body.name, _id: { $ne: req.params.id } })
            .then(existingHangsanxuat => {
                if (existingHangsanxuat) {
                    req.flash('error', 'Tên này đã tồn tại.'); // Set flash message
                    res.redirect(`/hangsanxuats/${req.params.id}/edit`);
                } else {
                    // Continue with the update logic
                    Hangsanxuat.updateOne({ _id: req.params.id }, req.body)
                        .then(() => res.redirect('/adminshow/hangsanxuats'))
                        .catch(next);
                }
            })
            .catch(next);
    }
    
  
    
    delete(req, res, next) {
        Hangsanxuat.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }








    // Hiển thị danh sách sản phẩm theo hãng sản xuất 
    async productsByManufacturer(req, res, next) {
        const perPage = 8;
        const page = req.query.page || 1;

        try {
            const hangSanXuatId = req.params.id;

            // Lấy danh sách hãng sản xuất
            const hangsanxuats = await Hangsanxuat.find({}, 'name');

            // Lấy danh sách sản phẩm theo hãng sản xuất
            const options = {
                page: page,
                limit: perPage,
            };

            const dienthoais = await Dienthoai.paginate({ HangSX: hangSanXuatId }, options);

            res.render('productsByManufacturer', {
                dienthoais: mutipleMongooseToObject(dienthoais.docs),
                hangsanxuats: mutipleMongooseToObject(hangsanxuats),
                current: dienthoais.page,
                pages: dienthoais.totalPages,
                title: '-- manufacturer --',
            });
        } catch (err) {
            next(err);
        }
    }













}

module.exports = new HangsanxuatController();