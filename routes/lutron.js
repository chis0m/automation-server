var express = require('express');
var router = express.Router();
var lutronController = require('../controllers/lutronController');

router.get('/details', function(req, res){
    lutronController.LutronDetails(req, res);
});
router.post('/dimmer', function(req, res){
    lutronController.LutronDimmer(req, res);
});
router.post('/button', function(req, res){
    lutronController.LutronButton(req, res);
});
router.post('/led', function(req, res){
    lutronController.LutronLed(req, res);
});



module.exports = router