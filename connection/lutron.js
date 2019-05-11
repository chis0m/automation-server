const net = require('net');
let client = new net.Socket()
const device = require('../database/devicesInRoom');
const Message = require('../connection/socketIo');
const  connection = require('../database/connection');
let devices = connection.query('SELECT * from devices where type="light"');
const io = new Message()
module.exports = function(scene,res,tabToken, deviceToken){
    tabToken = tabToken || null;
    deviceToken = deviceToken || null;
    if (deviceToken) {
        const deviceDetails = device.oneDevice(tabToken, deviceToken);
        const ip = deviceDetails.ip;
        const port = deviceDetails.port;
        const  serial = deviceDetails.serial_num; 
        connectToLutron(ip,port,serial,scene)      
    } else {
        devices.forEach(element => {
            let ip = element.ip;
            let port = element.port;
            let  serial = element.serial_num;
            connectToLutron(ip,port,serial,scene)
        })
    }

    function connectToLutron(ip, port,serial,scene){
        console.log(serial, port, ip);
        console.log(scene);
        client.connect(port,ip,function(){
            console.log('connected');
            client.write('nwk\r\n');
            console.log("sent\n");
            switch (scene) {
                case "0":
                    client.write('#device,'+serial+',83,3\r\n');
                    break;
                case "1":
                    client.write('#device,'+serial+',77,3\r\n');
                    break;
                case "2":
                    client.write('#device,'+serial+',76,3\r\n');
                    break;
                case "3":
                    client.write('#device,'+serial+',71,3\r\n');
                    break;
                case "4":
                    client.write('#device,'+serial+',70,3\r\n');
                    break;
                default:
                    client.write('#device,'+serial+',77,3\r\n');
                    break;
            }
        });
        
        client.on('data', function(data){
            console.log(data.toString())
            data = data.toString()
            client.end();
            res.end()
        })
        
        client.on('error',function(err){
            if (err['code'] == 'ENETUNREACH') {
                io.send('error',`Server is not connected`);
            }
            if (err['code'] == 'EHOSTUNREACH') {
                io.send('error',`Check Lutron Interface ${ip} connection`);
            }
            if (err['code'] == 'ETIMEDOUT') {
                io.send('error',`Check Lutron Interface connection ${ip} ,timed out`);
            }
            if (err['code'] == 'EADDRINUSE') {
                io.send('error',`Check Address in use ${ip} ,timed out`);
            }
            client.end();
            res.end()
        });
    }

}
process.on('uncaughtException', function(err){
    console.log(err['code'])
})