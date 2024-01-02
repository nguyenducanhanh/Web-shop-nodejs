const express = require('express');
const router = express.Router();
const lienhe = require('../app/controllers/LienhesController');
const authMiddleware = require('../app/middlewares/checkAdmin');

router.get('/abc', lienhe.lienhe);
router.use(authMiddleware.requireAuth);                    // nhảy ra login 
router.get('/:id/edit', lienhe.edit);
router.put('/:id', lienhe.update);



module.exports = router


