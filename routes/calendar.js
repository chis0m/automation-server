var express = require('express');
var router = express.Router();
var calendarController = require('../controllers/calendarController');

router.post('/meeting-list', function(req, res){
    calendarController.calendarMeetingList(req, res);
});

router.post('/meeting-info', function(req, res){
    calendarController.calendarMeetingInfo(req, res);
});

module.exports = router;