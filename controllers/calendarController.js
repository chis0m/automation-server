const timer = require('../actions/timer');
const client = require('../connection/groupseries');
const processCalendar = require('../actions/processCalendar');
let conn;
module.exports = {
    calendarMeetingList : function(req, res){
        let streamData = '';
        req.body.start = req.body.start || "today";
        req.body.end = req.body.end || "tomorrow";
        const command = 'calendarmeetings list ' + '"' + req.body.start + '"' + ' ' + '"' + req.body.end + '"' + '';
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processCalendar(streamData,res);
                conn.end()
            });
        })
    },
    calendarMeetingInfo : function(req, res){

    }
}