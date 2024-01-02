const express = require('express');
const router = express.Router();
const publicpage = require('../app/controllers/PublicPageController');
router.get('/', publicpage.index);
router.get('/search', publicpage.searchByName);
module.exports = router;