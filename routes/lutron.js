var express = require('express');
var router = express.Router();
var lutronController = require('../controllers/lutronController');

router.post('/scene', function(req, res){
    lutronController.LutronScene(req, res);
});
module.exports = router