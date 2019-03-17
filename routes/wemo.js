var express = require('express');
var router = express.Router();
var wemoController = require('../controllers/wemoController');

router.get('/on', function(req, res){
    wemoController.WemoOn(req, res);
});
router.get('/off', function(req, res){
    wemoController.WemoOff(req, res);
});

module.exports = router