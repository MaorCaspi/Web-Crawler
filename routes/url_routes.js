const express = require('express');
const router = express.Router();

const Url = require('../controllers/urls');

router.get('/', Url.getUrls);

router.post('/', Url.processUrl);

module.exports = router;