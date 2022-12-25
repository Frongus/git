const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(`IP: ${req.ip} tryed connecting to URL: ${req.url}`);
    res.render('sick.hbs');
})

module.exports = router;