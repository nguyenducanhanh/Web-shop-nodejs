const Dienthoai = require('../models/Dienthoai')
class NewsController {

    index(req, res) {
        Dienthoai.find({}, function (err, dienthoais)
        {
            if(!err) {
                res.json(dienthoais);
            } else {
            res.status(400).json({error: 'erroe'})
            }
        })     
    }

    show(req, res) {
     res.render('khongcoquyen',{title: 'YOU HAVE NO RIGHTS'})
    }
}
module.exports = new NewsController;