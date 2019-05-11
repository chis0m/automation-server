var express = require('express');
var router = express.Router();
var globalDirController = require('../controllers/globalDirController')

router.get('/grouplist', (req, res)=>{
    globalDirController.globalDirGroupList(req, res);
});

router.post('/database', (req, res)=>{
    globalDirController.globalDirSearchDatabase(req, res);
});
router.post('/search', (req, res)=>{
    globalDirController.globalDirSearch(req, res);
});
router.post('/save', (req, res)=>{
    globalDirController.globalDirSave(req, res);
});

router.post('/search-size', (req, res)=>{
    globalDirController.globalDirSearchSize(req, res);
});

router.post('/range', (req, res)=>{
    globalDirController.globalDirRange(req, res);
});

router.post('/search-range', (req, res)=>{
    globalDirController.globalDirSearchRange(req, res);
});

router.post('/grouplist-id', (req, res)=>{
    globalDirController.globalDirGroupListId(req, res);
});

router.post('/string-id', (req, res)=>{
    globalDirController.globalDirStringId(req, res);
});

router.post('/range-id', (req, res)=>{
    globalDirController.globalDirRangeId(req, res);
});

router.post('/range-search-id', (req, res)=>{
    globalDirController.globalDirRangeSearchId(req, res);
});

module.exports = router