const express = require('express');
const router = express.Router();
const gioithieu = require('../app/controllers/GioithieuController.js');
router.get('/', gioithieu.index);

module.exports = router;