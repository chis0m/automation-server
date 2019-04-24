const timer = require('../actions/timer');
const token = require('../actions/setTokens');
const client = require('../connection/groupseries');
const processResponse = require('../actions/processResponse')
let conn;

module.exports = {
    PresetNearGo : function(req, res){
        let streamData = '';
        const command = "preset near go "+req.body.operation;
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString('utf8');
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })
    },
    PresetNearSet : function(req, res){
        let streamData = '';
        const command = "preset near set "+req.body.operation;
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString('utf8');
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })
    },
    PresetFarGo : function(req, res){
        let streamData = '';
        const command = "preset far go "+req.body.operation;
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString('utf8');
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })
    },
    PresetFarSet : function(req, res){
        let streamData = '';
        const command = "preset far set "+req.body.operation;
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString('utf8');
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })
    },
}