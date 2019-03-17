var express = require('express');
var router = express.Router();
var callController = require('../controllers/callController')

router.get('/recent-calls', function(req, res){
    callController.CallRecentCalls(req, res)
});
router.get('/answer-video', function(req, res){
    callController.CallAnswerVideo(req, res)
});
router.get('/hangup-all', function(req, res){
    callController.CallHangupAll(req, res)
});
router.get('/state', function(req, res){
    callController.CallState(req, res)
});
router.get('/info', function(req, res){
    callController.CallInfo(req, res)
});
router.post('/recent-calls', function(req, res){
    callController.CallHangupId(req, res)
});
router.post('/hangup-id', function(req, res){
    callController.CallHangupId(req, res)
});
router.post('/from-book', function(req, res){
    callController.CallFromBook(req, res)
});
router.post('/auto', function(req, res){
    callController.CallAuto(req, res)
});
router.post('/manual', function(req, res){
    callController.CallManual(req, res)
});
router.post('/audio', function(req, res){
    callController.CallAudio(req, res)
});
router.post('/gendial', function(req, res){
    callController.CallGendial(req, res)
});


module.exports = router