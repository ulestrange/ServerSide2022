
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/about',  (req, res) => {
    res.type('text/plain');
    res.send('About Our Holidays');
});

router.get('/contact',  (req, res) => {
    res.type('text/plain');
    res.send('Don\'t bother we never reply');
});

module.exports = router;