var express = require('express');
var router = express.Router();
var buttonController = require('../controllers/buttonController')

router.get('/select', function(req, res){
    buttonController.ButtonSelect(req, res)
});
router.get('/back', function(req, res){
    buttonController.ButtonBack(req, res)
});
router.get('/call', function(req, res){
    buttonController.ButtonCall(req, res)
});
router.get('/graphics', function(req, res){
    buttonController.ButtonGraphics(req, res)
});
router.get('/hangup', function(req, res){
    buttonController.ButtonHangUp(req, res)
});
router.get('/camera', function(req, res){
    buttonController.ButtonCamera(req, res)
});
router.get('/home', function(req, res){
    buttonController.ButtonHome(req, res)
});
router.get('/keyboard', function(req, res){
    buttonController.ButtonKeyBoard(req, res)
});
router.get('/menu', function(req, res){
    buttonController.ButtonMenu(req, res)
});
router.get('/period', function(req, res){
    buttonController.ButtonPeriod(req, res)
});
router.get('/pip', function(req, res){
    buttonController.ButtonPip(req, res)
});
router.get('/preset', function(req, res){
    buttonController.ButtonPreset(req, res)
});
router.get('/info', function(req, res){
    buttonController.ButtonInfo(req, res)
});
router.post('/digit', function(req, res){
    buttonController.ButtonDigit(req, res)
});
router.post('/direction', function(req, res){
    buttonController.ButtonDirection(req, res)
});
router.post('/volume', function(req, res){
    buttonController.ButtonVolume(req, res)
});



module.exports = router