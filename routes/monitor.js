var express = require('express');
var router = express.Router();
var  monitorController = require('../controllers/monitorController');

router.get('/on', function(req, res){
    monitorController.MonitorOn(req, res);
});
router.get('/off', function(req, res){
    monitorController.MonitorOff(req, res);
});
router.get('/volume', function(req, res){
    monitorController.MonitorGetVolume(req, res);
});
router.post('/volume', function(req, res){
    monitorController.MonitorVolume(req, res);
});


module.exports = router