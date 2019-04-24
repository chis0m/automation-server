const net = require('net')
const client = new net.Socket();
const  connection = require('../database/connection')
const command = "notify callstatus\r\n";

let gs = connection.query("SELECT * FROM devices where type = 'group_series' ");
if (gs.length > 0) {
    gs = retrieveSingleArray(gs)
    const IP = gs.ip;
    const PORT = gs.port;
    const PASSWORD = gs.password;
    connect() 
    client.on('error', (err) => {
        console.log(err['code'] + ' notification')
        if (err['code'] == 'ENETUNREACH') {
            console.log({"Error" : "Server is not connected notification"});
            process.send({"Error": `Server is not connected`});
            setTimeout(function(){
                connect();
            },45000);
        }
        if (err['code'] == 'EHOSTUNREACH') {
            console.log({"Error" : `Check group series ${IP} connection notification`});
            process.send({"Error": `Check group series ${IP} connection`});
            console.log("reconnecting to group series...")
            setTimeout(function(){
                connect();
            },25000);
        }
        if (err['code'] == 'ETIMEDOUT') {
            console.log({"Error" : `Check group series connection,${IP} timed out notification`});
            process.send({"Error": `Check group series connection ${IP} ,timed out`});
        }
        if (err['code'] == "ECONNREFUSED") {
            console.log('reconnecting to group series...')
            setTimeout(function(){
                connect();
            },15000);
        }
    });
    client.on('data', data =>{
        let str = data.toString();
        let ringing = str.match(/(notification:callstatus:incoming:)[0-9]{1,4}(:){1}([\w\s\W]+)(:){1}(ringing)(:){1}[0-9]+(:){1}[0-9]+(:){1}[a-zA-Z]+/g);
    
        let connected = str.match(/(notification:callstatus:incoming:)[0-9]{1,4}(:){1}([\w\s\W]+)(:){1}(connected)(:){1}[0-9]+(:){1}[0-9]+(:){1}[a-zA-Z]+/g);
    
        let disconnected = str.match(/(notification:callstatus:incoming:)[0-9]{1,4}(:)([\w\s\W]+)(:){1}(disconnected)(:){1}[0-9]+(:){1}[0-9]+(:){1}[a-zA-Z]+/g);
        
        let outRinging = str.match(/(notification:callstatus:outgoing:)[0-9]{1,4}(:)([\w\s\W]+)(:){1}(opened)(:){1}[0-9]+(:){1}[0-9]+(:){1}[a-zA-Z]+/g);
    
        let outConnected = str.match(/(notification:callstatus:outgoing:)[0-9]{1,4}(:)([\w\s\W]+)(:){1}(connected)(:){1}[0-9]+(:){1}[0-9]+(:){1}[a-zA-Z]+/g);
        
        let outDisconnected = str.match(/(notification:callstatus:outgoing:)[0-9]{1,4}(:){1}([\w\s\W]+)(:){1}(disconnected)(:){1}[0-9]+(:){1}[0-9]+(:){1}[a-zA-Z]+/g);
    
        
        if (outRinging != null) {
            outRinging = removeDups(outRinging);
            outRinging = outgoingCall(outRinging);
            process.send({"ringing": outRinging});
            // sendConnecting(outRinging);f
            console.log("out:")
            console.log(outRinging);
            console.log("======================================");
        }
        
        if (outConnected != null) {
            outConnected = removeDups(outConnected);
            outConnected = outgoingCall(outConnected);
            process.send({"connected": outConnected});
            console.log("out:")
            console.log(outConnected)
            console.log("=======================================");
        }
    
        if (outDisconnected != null) {
            outDisconnected = removeDups(outDisconnected);
            outDisconnected = outgoingCall(outDisconnected);
            process.send({"disconnected": outDisconnected});
            console.log("out:")
            console.log(outDisconnected)
            console.log("========================================");   
        }
    
    
        if (ringing != null) {
            ringing = removeDups(ringing);
            ringing = incomingCall(ringing);
            process.send({"incoming-ringing": ringing});
            console.log("in:")
            console.log(ringing);
            console.log("-------------------------------------------");
    
        }
        
        if (connected != null) {
            connected = removeDups(connected);
            connected = incomingCall(connected);
            process.send({"incoming-connected": connected});
            console.log("in:")
            console.log(connected);
            console.log("-------------------------------------------");
        }
        
        if (disconnected != null) {
            disconnected = removeDups(disconnected);
            disconnected = incomingCall(disconnected);
            process.send({"incoming-disconnected": disconnected});
            console.log("in:")
            console.log(disconnected); 
            console.log("-------------------------------------------");
        }
    })
    
    function connect(){
        client.connect(PORT, IP, ()=>{
            client.write(PASSWORD+'\r\n'+command+'\r\n');
            console.log('connected for notification')
        });
    }
    
    function incomingCall(item){
        let res = item[0].split(":");
        callObj = {"callId":res[3],
                    "detail":res[5],
                    "status":res[6],
                    "callspeed":res[7]
                    } 
        return callObj;
    }
    function outgoingCall(str){
        let callObj;
        if (Array.isArray(str) && str.length) {
                let res = str[0].split(":");
                callObj = {"callId":res[3],
                            "detail":res[4]+' '+res[5],
                            "status":res[6],
                            "callspeed":res[7]
                          } 
            return callObj;
        }
    }
    function retrieveSingleArray(array){
        if (array.length == 1) {
            return array[0];
        }
        return array;
    }
    function removeDups(names) {
        let unique = {};
        names.forEach(function(i) {
          if(!unique[i]) {
            unique[i] = true;
          }
        });
        return Object.keys(unique);
    }
}

process.on('uncaughtException', function(err){
    console.log(err['code'])
    if (err['code'] == "ECONNREFUSED") {
        connect();
    }
    if (err['code'] == 'ERR_HTTP_HEADERS_SENT') {
        process.exit(1);
    }
})