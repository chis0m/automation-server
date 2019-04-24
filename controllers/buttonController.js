const timer = require('../actions/timer');
// const token = require('../actions/setTokens');
const client = require('../connection/groupseries');
const processResponse = require('../actions/processResponse')

module.exports = {
    ButtonSelect : function(req, res) {
        const command = "button select";
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
    ButtonBack : function(req, res) {
        
    },
    ButtonCall : function(req, res) {
        const command = "button call";
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
    ButtonGraphics : function(req, res) {
        
    },
    ButtonHangUp : function(req, res) {
        const command = "button hangup";
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
    ButtonCamera : function(req, res) {
        const command = "button camera";
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
    ButtonHome : function(req, res) {
        const command = "button home";
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
    ButtonKeyBoard : function(req, res) {
        const command = "button keyboard";
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
    ButtonMenu : function(req, res) {
        const command = "button menu";
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
    ButtonPeriod : function(req, res) {
        
    },
    ButtonPip : function(req, res) {
        
    },
    ButtonPreset : function(req, res) {
        const command = "button preset";
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
    ButtonInfo : function(req, res) {
        const command = "button info";
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
    ButtonDigit : function(req, res) {
        const command = "button "+req.body.operation;
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
    ButtonDirection : function(req, res) {
        const command = "button "+req.body.operation;
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
    ButtonVolume : function(req, res) {
        const command = "button "+req.body.operation;
        let streamData = '';
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processResponse(streamData,res);
                conn.end();
            });
        })      
    }
}