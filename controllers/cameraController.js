const timer = require('../actions/timer');
// const token = require('../actions/setTokens');
const client = require('../connection/groupseries');
const processResponse = require('../actions/processResponse')
const processCamera = require('../actions/processCamera');
let conn;

module.exports = {
    CamNearGetPosition : function(req, res){
        const command = "camera near getposition";
        let streamData = '';
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processCamera(streamData,res);
                conn.end()
            });
        })
    },
    CamListContent : function(req, res){
        const command = "camera list-content";
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
    CamNearInvertGet : function(req, res){

    },
    CamNearPpcip : function(req, res){

    },
    CamNearStop : function(req, res){
        const command = "camera near stop";
        let streamData = '';
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })
        // processResponse(conn, res, processCamera);

    },
    CamFarStop : function(req, res){
        const command = "camera far stop";
        let streamData = '';
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })        // processResponse(conn, res, processCamera);
    },
    CamNear : function(req, res){
        const command = "camera near "+req.body.operation;
        let streamData = '';
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })        // processResponse(conn, res, processCamera);

    },
    CamFar : function(req, res){
        const command = "camera far "+req.body.operation;
        let streamData = '';
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })        // processResponse(conn, res, processCamera);
    },
    CamForPeople : function(req, res){
        const command = "camera for-people "+req.body.operation;
        let streamData = '';
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })        // processResponse(conn, res, processCamera);

    },
    CamForContent : function(req, res){
        const command = "camera for-content "+req.body.operation;
        let streamData = '';
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })        // processResponse(conn, res, processCamera);
    },
    CamNearMove : function(req, res){
        const command = "camera near move "+req.body.operation;
        let streamData = '';
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })        // processResponse(conn, res, processCamera);
    },
    CamFarMove : function(req, res){
        const command = "camera far move "+req.body.operation;
        let streamData = '';
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })        // processResponse(conn, res, processCamera);
    },
    CamNearSource : function(req, res){
        const command = "camera near source";
        let streamData = '';
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
            });
        })        // processResponse(conn, res, processCamera);
    },
     CamFarSource : function(req, res){
        const command = "camera far source";
        let streamData = '';
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
    CamNearSetPosition : function(req, res){
        const command = "camera near setposition "+req.body.positionX+" "+req.body.positionY+" "+req.body.positionZ;
        let streamData = '';
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end()
                // conn.removeAllListeners();
            });
        })
    },
    CamNearInvertOn : function(req, res){

    },
    CamNearInvertOff  : function(req, res){

    },
}