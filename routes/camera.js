var express = require('express')
var router = express.Router()
var cameraController = require('../controllers/cameraController')

router.get('/near-get-position', (req, res)=>{
    cameraController.CamNearGetPosition(req, res)
})
router.get('/list-content', (req, res)=>{
    cameraController.CamListContent(req, res)
})
router.get('/near-invert-get', (req, res)=>{
    cameraController.CamNearInvertGet(req, res)
})
router.get('/near-ppcip', (req, res)=>{
    cameraController.CamNearPpcip(req, res)
})
router.get('/near-stop', (req, res)=>{
    cameraController.CamNearStop(req, res)
})
router.get('/far-stop', (req, res)=>{
    cameraController.CamFarStop(req, res)
})
router.post('/near', (req, res)=>{
    cameraController.CamNear(req, res)
})
router.post('/far', (req, res)=>{
    cameraController.CamFar(req, res)
})
router.post('/for-people', (req, res)=>{
    cameraController.CamForPeople(req, res)
})
router.post('/for-content', (req, res)=>{
    cameraController.CamForContent(req, res)
})
router.post('/near-move', (req, res)=>{
    cameraController.CamNearMove(req, res)
})
router.post('/far-move', (req, res)=>{
    cameraController.CamFarMove(req, res)
})
router.post('/near-source', (req, res)=>{
    cameraController.CamNearSource(req, res)
})
router.post('/far-source', (req, res)=>{
    cameraController.CamFarSource(req, res)
})
router.post('/near-set-position', (req, res)=>{
    cameraController.CamNearSetPosition(req, res)
})
router.post('/near-invert-off', (req, res)=>{
    cameraController.CamNearInvertOff(req, res)
})

module.exports = router