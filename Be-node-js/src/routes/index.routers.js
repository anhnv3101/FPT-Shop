const express = require('express');
const router = express.Router();


const uploadImage = require('./images.router.js');

// Gán các router con vào router chính với tiền tố URL phù hợp

router.use('/upload', uploadImage);

module.exports = router;