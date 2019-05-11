var express = require('express');
var router = express.Router();
var projectorController = require('../controllers/projectorController')

router.get('/on', function(req, res){
    projectorController.ProjectorOn(req, res)
})
router.get('/off', function(req, res){
    projectorController.ProjectorOff(req, res)
})

module.exports = router