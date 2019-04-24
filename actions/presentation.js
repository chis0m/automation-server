const net = require('net')
const func = require('./methods');
const Message = require('../connection/socketIo');
const  connection = require('../database/connection');
let devices = connection.query('SELECT * from devices');
const io = new Message()
let buf;
let hex;

module.exports = function(res){
    if (devices.length > 0) {
        
        let gp = devices.filter(element => {
            return element.type == "group_series";
        });
        let ma = devices.filter(element => {
            return element.monitor_id === 1;
        });
        let mb = devices.filter(element => {
            return element.monitor_id === 2;
        });
        let ge = devices.filter(element => {
            return element.type == 'light';
        });
        let pj = devices.filter(element => {
            return element.type == 'projector';
        });

        connectToGroupSeries(res);
        connectToFirstMonitor(res);
        connectToSecondMonitor(res);
        if (pj.length > 0) {
            connectToProjector(res);
        }
        connectToLutron(res);

        function connectToGroupSeries(res){
            const client = new net.Socket();
            let element = gp[0];
            console.log("group series connecting...\n")
            client.connect(element.port, element.ip, ()=>{
                client.write(element.password+'\r\n');
                client.write('sleep\r\n');
            });
            client.on('error', (err) => {
                console.log(err['code'] + ' group series')
                if (err['code'] == 'ENETUNREACH') {
                    console.log({"Error" : "Server is not connected"});
                    io.send('error', `Server is not connected`);
                }
                if (err['code'] == 'EHOSTUNREACH') {
                    console.log({"Error" : `Check group series ${element.ip} connection`});
                    io.send('error', `Check group series ${element.ip} connection`);
                }
                if (err['code'] == 'ETIMEDOUT') {
                    console.log({"Error" : `Check group series connection,${element.ip} timed out`});
                    io.send('error', `Check group series connection ${element.ip} ,timed out`);
                }
                client.end();
                res.end();
            });
            client.on('data', data=>{
                // console.log("group series slept\n")
                res.end();
                client.end();
            })
        }
        function connectToFirstMonitor(res){
            const clientObj = new net.Socket();
            let element = ma[0];
            switch (element.monitor_id) {
                case 1:
                    buf = Buffer.from('01304130413043024332303344363030303403', 'hex');
                    hex = Buffer.from(func.blockCheckCode(buf,true), 'hex')
                    sendPowerHex(clientObj,hex,element.ip,element.port,res);
                    break;
        
                case 2:
                    buf = Buffer.from('01304230413043024332303344363030303403', 'hex');
                    hex = Buffer.from(func.blockCheckCode(buf,true), 'hex')
                    sendPowerHex(clientObj,hex,element.ip,element.port,res);
                    break;
                default:
                    console.log(element.monitor_id);
                    console.log('Id ' + element.monitor_id + ' Not within range');
                    break;
            }           
        }
        function connectToSecondMonitor(res){
            const clientObj = new net.Socket();
            let element = mb[0];
            switch (element.monitor_id) {
                case 1:
                    buf = Buffer.from('01304130413043024332303344363030303403', 'hex');
                    hex = Buffer.from(func.blockCheckCode(buf,true), 'hex')
                    sendPowerHex(clientObj,hex,element.ip,element.port,res);
                    break;
        
                case 2:
                    buf = Buffer.from('01304230413043024332303344363030303403', 'hex');
                    hex = Buffer.from(func.blockCheckCode(buf,true), 'hex')
                    sendPowerHex(clientObj,hex,element.ip,element.port,res);
                    break;
                default:
                    console.log(element.monitor_id);
                    console.log('Id ' + element.monitor_id + ' Not within range');
                    break;
            }        
        }
        function connectToLutron(res){
            const client = new net.Socket();
            let element = ge[0];
            console.log("Lutron light connecting...\n")
            client.connect(element.port,element.ip,function(){
                client.write('nwk\r\n');
                client.write('#device,'+element.serial_num+',76,3\r\n');
            });
            client.on('error', (err) => {
                console.log(err['code'] + ' lutron')
                if (err['code'] == 'ENETUNREACH') {
                    console.log({"Error" : "Server is not connected"});
                    io.send('error', `Server is not connected`);
                }
                if (err['code'] == 'EHOSTUNREACH') {
                    console.log({"Error" : `Check Lutron ${element.ip} connection`});
                    io.send('error', `Check lutron ${element.ip} connection`);
                }
                if (err['code'] == 'ETIMEDOUT') {
                    console.log({"Error" : `Check lutron connection,${element.ip} timed out`});
                    io.send('error', `Check lutron connection ${element.ip} ,timed out`);
                }
                client.end();
                res.end();
            });
            client.on('data', function(data){
                // console.log('light set at level 2\n');
                client.end();
                res.end()
            })        
        }
        function connectToProjector(res){
            const client = new net.Socket();
            let element = pj[0];
            buf = Buffer.from('020000000002', 'hex');
            // buf = Buffer.from('FE006565FF', 'hex');
            // OnBuffer = Buffer.from('FE000000FF', 'hex');
            console.log('projector connecting...\n');
            client.connect(element.port,element.ip,function(){
                client.write(buf+'\r\n');
            });
            client.on('error',function(err){
                console.log(err['code'] + ' projector')
                if (err['code'] == 'ENETUNREACH') {
                    console.log({"Error" : "Server is not connected"});
                    io.send('error', 'Server is not connected'); 
                }
                if (err['code'] == 'EHOSTUNREACH') {
                    console.log({"Error" : `Check Nec Monitor ${element.ip} connection`});
                    io.send('error', `Check Nec Monitor ${element.ip} connection`); 
                }
                if (err['code'] == 'ETIMEDOUT') {
                    console.log({"Error" : `Check Nec Monitor connection,${element.ip} timed out`});
                    io.send('error', `Check Lutron Interface connection ${element.ip} ,timed out`); 
                }
                client.end();
                res.end()
              });
            client.on('data', function(data){
                // console.log('projector turned on\n');
                client.end();
                res.end()
                // client.write(OnBuffer);
                // client.on('data',(data)=>{
                //     client.end();
                //     res.end()
                // })
            })
        }
        function sendPowerHex(client,hex,ip,port,res){
            console.log('monitor connecting...\n')
            client.connect(port,ip,function(){
                client.write(hex);
            });
            client.on('error',function(err){
                console.log(err['code'] + ' monitor')
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
                res.end()
              });
            
            client.on('data', (data)=>{
                // console.log('monitor turned off\n')
                client.end();
                res.end()
            });
        }
    }

}