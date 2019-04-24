const timer = require('../actions/timer');
const token = require('../actions/setTokens');
const client = require('../connection/groupseries');
const processResponse = require('../actions/processResponse')
const processVolume = require('../actions/processVolume')
const monitorvolume = require('../actions/monitorvolume');
let conn;
module.exports = {
    volumeGet : function(req, res){
        let streamData = '';
        const command = 'volume get';
        conn = client(command, res);
        conn.on('data', (data)=>{
            streamData += data.toString('utf8');
            timer.clearTimer();
            timer.startTimer(function(){
                processVolume(streamData,res);
                conn.end()
            });
        })
    },
    volumeUp : function(req, res){

    },
    volumeDown : function(req, res){

    },
    volumeSet : function(req, res){
        let volume = req.body.operation * 2;
        monitorvolume(volume,res);
        let streamData = '';
        const command = 'volume set '+ req.body.operation;
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
    volumeRange : function(req, res){
        
    }
}