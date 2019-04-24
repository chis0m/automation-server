var express = require('express');
var router = express.Router();
var ShareContentController = require('../controllers/ShareContentController');


router.get('/get',function(req, res){
    ShareContentController.shareGet(req, res);
});

router.get('/list-source',function(req, res){
    ShareContentController.shareListSource(req, res);
});

router.get('/map-get',function(req, res){
    ShareContentController.shareMapGet(req, res);
});

router.get('/source-get',function(req, res){
    ShareContentController.shareSourceGet(req, res);
});

router.get('/stop',function(req, res){
    ShareContentController.shareStop(req, res);
});

router.post('/play',function(req, res){
    ShareContentController.sharePlay(req, res);
});

router.get('/map',function(req, res){
    ShareContentController.shareMap(req, res);
});


module.exports = router;