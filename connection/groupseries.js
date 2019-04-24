const net = require('net')
const client = new net.Socket();
const Message = require('../connection/socketIo');
// const device = require('../database/devicesInRoom');
const  connection = require('../database/connection');
let devices = connection.query('SELECT * from devices where type="group_series"');
let element = devices[0];
const IP = element.ip;
const PORT = element.port;
const PASSWORD = element.password;
const io = new Message()

module.exports = function(command,res){
    console.log(command+" coming "+`on ${IP} and ${PORT}`)
    client.connect(PORT, IP, ()=>{
        client.write(PASSWORD+'\r\n'+command+'\r\n');
        console.log('\n'+command)
        console.log("sent\n")
    });
    client.on('error', (err) => {
        if (err['code'] == 'ENETUNREACH') {
            console.log({"Error" : "Server is not connected"});
            io.send('error', `Server is not connected`);
        }
        if (err['code'] == 'EHOSTUNREACH') {
            console.log({"Error" : `Check group series ${IP} connection`});
            io.send('error', `Check group series ${IP} connection`);
        }
        if (err['code'] == 'ETIMEDOUT') {
            console.log({"Error" : `Check group series connection,${IP} timed out`});
            io.send('error', `Check group series connection ${IP} ,timed out`);
        }
        client.end();
        if(typeof res == Object) res.end();
    });
    return client;
}

