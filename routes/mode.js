var express = require('express');
var router = express.Router();
var modeController = require('../controllers/modeController');

router.get('/sleep', function(req, res){
    modeController.ModeSleep(req, res);
});

router.get('/wake', function(req, res){
    modeController.ModeWake(req, res)
})



module.exports = router