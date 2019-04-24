var express = require('express');
var router = express.Router();
var presetController = require('../controllers/presetController')

router.post('/near-go', function(req, res){
    presetController.PresetNearGo(req, res)
})
router.post('/near-set', function(req, res){
    presetController.PresetNearSet(req, res)
})
router.post('/far-go', function(req, res){
    presetController.PresetFarGo(req, res)
})
router.post('/far-set', function(req, res){
    presetController.PresetFarSet(req, res)
})

module.exports = router