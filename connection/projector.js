const net = require('net');
let client = new net.Socket();
const Message = require('../connection/socketIo');
const  connection = require('../database/connection');
let devices = connection.query('SELECT * from devices where type="projector"');
const io = new Message();
module.exports = function(command,res){
    if (devices.length > 0) {
        devices.forEach(element => {
            let buf
            switch (command) {
                case 'on':
                    buf = Buffer.from('020000000002', 'hex');
                    // buf = Buffer.from('FE006565FF', 'hex');
                    // OnBuffer = Buffer.from('FE000000FF', 'hex');
                    console.log(command)
                    client.connect(element.port,element.ip,function(){
                        console.log('Connected to Projector');
                        client.write(buf);
                        console.log("sent\n")
                    });
                    client.on('data', (data)=>{
                        client.end();
                        res.end();
                        // client.write(OnBuffer);
                        // client.on('data', ()=>{
                        //     client.end();
                        //     res.end()
                        // })
                    });
                    break;
                case 'off':
                    buf = Buffer.from('020100000003', 'hex');
                    // buf = Buffer.from('FE006666FF', 'hex');
                    console.log('\n"'+command)
                    client.connect(element.port,element.ip,function(){
                        console.log('Connected to Projector')
                        client.write(buf);
                        console.log("sent\n")
                    });
                    client.on('data', (data)=>{
                        client.end();
                        res.end()
                    });
                    break;    
                default:
                    console.log('Id' + id + 'Not within range');
                    break;
            }
            // client.on('data', (data)=>{
            //     res.end()
            //     // client.write(OnBuffer);
            //     // client.on('data', ()=>{
            //     //     client.end();
            //     //     res.end()
            //     // })
            // });
            client.on('error',function(err){
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
                    io.send('error',`Check Lutron Interface connection ${element.ip} ,timed out`); 
                }
                client.end();
                res.end()     
              });
        });        
    }

}