var express = require('express');
var router = express.Router();
var  roomController = require('../controllers/roomController');

router.get('/conference', function(req, res){
    roomController.Conference(req, res);
});
router.get('/presentation', function(req, res){
    roomController.Presentation(req, res);
});

module.exports = router