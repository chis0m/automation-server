var express = require('express');
var router = express.Router();
var volumeController = require('../controllers/volumeController')

router.get('/get', (req, res)=>{
    volumeController.volumeGet(req, res);
});
router.get('/up', (req, res)=>{
    volumeController.volumeUp(req, res);
});
router.get('/down', (req, res)=>{
    volumeController.volumeDown(req, res);
});
router.get('/range', (req, res)=>{
    volumeController.volumeRange(req, res);
});
router.post('/set',(req, res)=>{
    volumeController.volumeSet(req, res);
});

module.exports = router