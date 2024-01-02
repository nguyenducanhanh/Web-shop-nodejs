const express = require('express');
const router = express.Router();
const khongcoquyen = require('../app/controllers/KhongCoQuyenController');
router.get('/khongduocphep', khongcoquyen.show);
router.get('/', khongcoquyen.index);
module.exports = router;