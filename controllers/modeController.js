const timer = require('../actions/timer');
const client = require('../connection/groupseries');
const lutron = require('../connection/lutron');
const exec = require('child_process').exec;
const pmonitor = require('../connection/pmonitor');
const projector = require('../connection/projector');
const processResponse = require('../actions/processResponse');

let conn;
module.exports = {
    ModeSleep : function(req, res){
        let streamData = '';
        const command = "sleep";
        lutron("3",res);
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
    ModeWake : function(req, res){
        let streamData = '';
        const command = "wake";
        lutron("4",res);
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
    ModeRestart : function(req, res){
        const command = 'reboot now';
        client(command, res);
        lutron("0",res);
        exec('echo -e "cl@ud" | sudo  -S  cat ~/.pm2/pm2.log && echo -e "cl@ud" | sudo -S reboot now',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
        setTimeout(function(){
            lutron("4",res);
            pmonitor('on', res);
        },5000)


    },
    ModeShutdown : function(req, res){
        const command = 'powerdown';
        client(command, res);
        pmonitor('off', res);
        projector('off', res);
        lutron("0",res);
        exec('echo -e "cl@ud\n" > sudo -S shutdown now',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
    }
}