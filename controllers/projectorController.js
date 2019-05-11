const projector = require('../connection/projector');
const lutron = require('../connection/lutron');
const client = require('../connection/groupseries');
const processResponse = require('../actions/processResponse');
let conn;
module.exports = {
    ProjectorOn : function(req, res){
        conn = client("sleep", res);
        projector("on", res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end();
            });
        })
    },
    ProjectorOff : function(req, res){
        lutron("4", res);
        projector("off", res);
    },
}