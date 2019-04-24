const net = require('net')
const func = require('./methods');
const volume = require('../files/volume.json');
const Message = require('../connection/socketIo');
const  connection = require('../database/connection');
let devices = connection.query('SELECT * from devices');
const io = new Message()
let buf;
let hex;


module.exports = function(data, res){
    if (devices.length > 0) {
        let ma = devices.filter(element => {
            return element.monitor_id === 1;
        });
        let mb = devices.filter(element => {
            return element.monitor_id === 2;
        });

        connectToFirstMonitor(data,res);
        connectToSecondMonitor(data,res);

        function connectToFirstMonitor(data,res){
            let clientObj = new net.Socket();
            let detail = ma[0];
            setVolume(data);
            function setVolume(data){
                buf = Buffer.from('013041304530410230303632'+volume[data]+'03', 'hex');
                hex = Buffer.from(func.blockCheckCode(buf,true), 'hex');
                sendVolumeSetHex(clientObj,hex,detail.ip,detail.port,res);
            }
      
        }
        
        function connectToSecondMonitor(data,res){
            let client = new net.Socket();
            let detail = mb[0];
            setVolume(data);
            function setVolume(data){
                buf = Buffer.from('013042304530410230303632'+volume[data]+'03', 'hex');
                hex = Buffer.from(func.blockCheckCode(buf,true), 'hex');
                sendVolumeSetHex(client,hex,detail.ip,detail.port,res);            
            }

        }

        function sendVolumeSetHex(client,hex,ip,port,res){
            client.connect(port,ip,function(){
                client.write(hex);
                console.log("volume "+data+ " sent\n")
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
                client.end();
                res.end()
    
            });
        } 
    }
}
