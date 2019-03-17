var express = require('express');
var router = express.Router();
var directoryController = require('../controllers/directoryController')

router.get('/get-all', (req, res)=>{
    directoryController.directoryGetAll(req, res);
});
router.get('/grouplist-size', (req, res)=>{
    directoryController.directoryGroupListSize(req, res);
});
router.post('/batch', (req, res)=>{
    directoryController.directoryBatch(req, res);
});
router.post('/batch/define', (req, res)=>{
    directoryController.directoryBatchDefine(req, res);
});
router.post('/batch/search', (req, res)=>{
    directoryController.directoryBatchSearch(req, res);
});
router.post('/letter', (req, res)=>{
    directoryController.directoryLetter(req, res);
});
router.post('/range', (req, res)=>{
    directoryController.directoryRange(req, res);
});
router.post('/groupList', (req, res)=>{
    directoryController.directoryGroupList(req, res);
});
router.post('/group-name/size', (req, res)=>{
    directoryController.directoryGroupNameSize(req, res);
});
router.post('/group-name/range', (req, res)=>{
    directoryController.directoryGroupNameRange(req, res);
});
router.post('/name-search', (req, res)=>{
    directoryController.directoryNameSearch(req, res);
});
router.post('/name/search-range', (req, res)=>{
    directoryController.directoryNameSearchRange(req, res);
});
router.post('/address/sys-id', (req, res)=>{
    directoryController.directoryAddressSysId(req, res);
});

module.exports = router;