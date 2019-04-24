const timer = require('../actions/timer');
// const token = require('../actions/setTokens');
const client = require('../connection/groupseries');
const processResponse = require('../actions/processResponse');
const processRecentCalls = require('../actions/processRecentCalls');
let conn;


module.exports = {
    CallRecentCalls : function(req, res){
        let streamData = '';
        const command = "recentcalls";
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processRecentCalls(streamData,res);
                conn.end()
            });
        })
    },

    CallAnswerVideo : function(req, res){
        let streamData = '';
        const command = "answer video";
        conn = client(command, res);
        // processResponse(conn, res, processCall);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })
    },

    CallHangupAll : function(req, res){
        let streamData = '';
        const command = "hangup all";
        conn = client(command, res);
        // processResponse(conn, res, processCall);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })
    },

    CallState : function(req, res){

    },

    CallInfo : function(req, res){

    },

    CallHangupId : function(req, res){
        let streamData = '';
        const command = "hangup video "+ req.body.callid;
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })

    },

    CallFromBook : function(req, res){
        let streamData = '';
        const command = "dial addressbook "+req.body.name;
        console.log(command)
        conn = client(command, res);
        // processResponse(conn, res, processCall);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })
    },

    CallAuto : function(req, res){

    },

    CallManual : function(req, res){
        let streamData = '';
        const command = "dial manual "+req.body.speed+" "+req.body.dialstring+" "+req.body.calltype;
        console.log(command)
        conn = client(command, res);
        // processResponse(conn, res, processCall);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })
    },

    CallAudio : function(req, res){
        let streamData = '';
        const command = "dial phone "+req.body.calltype+" "+req.body.dialstring;
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })
    },

    CallGendial : function(req, res){
        let streamData = '';
        let command = "gendial "+req.body.operation;
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })
    },
}