const net = require('net');
let client = new net.Socket();
const func = require('../actions/methods');
const volume = require('../files/volume.json');
const device = require('../database/devicesInRoom');
const Message = require('../connection/socketIo');
const  connection = require('../database/connection');
let devices = connection.query('SELECT * from devices where type="monitor"');
const io = new Message();

// module.exports = function(tabToken, deviceToken, command,res){
//     const deviceDetails = device.oneDevice(tabToken, deviceToken);
//     const ip = deviiceDetails.ip;
//     const port = deviceDetails.port;
//     const id = deviceDetails.monitor_id;

module.exports = function(command,res, tabToken, deviceToken){
    tabToken = tabToken || null;
    deviceToken = deviceToken || null;

    if (deviceToken) {
        const deviceDetails = device.oneDevice(tabToken, deviceToken);
        const ip = deviceDetails.ip;
        const port = deviceDetails.port;
        const id = deviceDetails.monitor_id;
        connectToMonitor(ip,port,id,command);
    }else{
        devices.forEach(element => {
            let ip = element.ip;
            let port = element.port;
            let id = element.monitor_id;
            connectToMonitor(ip,port,id,command);
        });

    }

    function connectToMonitor(ip,port,id,command){
        setVolume(command, id);
        function setVolume(data, id){
            let hex;
            let buf;
            switch (id) {
                case 1:
                    buf = Buffer.from('013041304530410230303632'+volume[data]+'03', 'hex');
                    hex = Buffer.from(func.blockCheckCode(buf,true), 'hex');
                    sendVolumeSetHex(hex,ip,port);
                    break;
        
                case 2:
                    buf = Buffer.from('013042304530410230303632'+volume[data]+'03', 'hex');
                    hex = Buffer.from(func.blockCheckCode(buf,true), 'hex');
                    sendVolumeSetHex(hex,ip,port);            
                    break;
        
                case 3:
                    buf = Buffer.from('013043304530410230303632'+volume[data]+'03', 'hex');
                    hex = Buffer.from(func.blockCheckCode(buf,true), 'hex');
                    sendVolumeSetHex(hex,ip,port);               
                    break;
        
                case 4:
                    buf = Buffer.from('013044304530410230303632'+volume[data]+'03', 'hex');
                    hex = Buffer.from(func.blockCheckCode(buf,true), 'hex');
                    sendVolumeSetHex(hex,ip,port);             
                    break;
            
                default:
                    console.log('Id' + id + 'Not within range');
                    break;
            }
    }
    
        function sendVolumeSetHex(hex,ip,port){
            console.log('\n"'+command)
            client.connect(port,ip,function(){
                client.write(hex);
                console.log("sent\n")
            });
            client.on('error',function(err){
                if (err['code'] == 'ENETUNREACH') {
                    console.log({"Error" : "Server is not connected"});
                    io.send('error', 'Server is not connected'); 
                }
                if (err['code'] == 'EHOSTUNREACH') {
                    console.log({"Error" : `Check Nec Monitor ${ip} connection`});
                    io.send('error', `Check Nec Monitor ${ip} connection`); 
                }
                if (err['code'] == 'ETIMEDOUT') {
                    console.log({"Error" : `Check Nec Monitor connection,${ip} timed out`});
                    io.send('error', `Check Lutron Interface connection ${ip} ,timed out`); 
                }
                client.end();
                res.end();
            });
            client.on('data', (data)=>{
                console.log(data)
                client.end();
                res.end()
    
            });
        }       
    }
}
process.on('uncaughtException', function(err){
    console.log(err['code'])
})