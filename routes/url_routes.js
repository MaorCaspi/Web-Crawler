const express = require('express');
const router = express.Router();

const Url = require('../controllers/urls');

router.get('/', Url.getUrls);

module.exports = router;