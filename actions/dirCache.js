const path = require('path');
const net = require('net')
const fs = require('fs');
const dbConnection = require('../database/connection');
const BASEDIR = path.dirname(__dirname);
// const CACHEFILE = path.join(BASEDIR + '/files/dirCache.txt');
var today = new Date();
let devices = dbConnection.query('SELECT * from devices where type="group_series"');
let element = devices[0];
const IP = element.ip;
const PORT = element.port;
const PASSWORD = element.password;

module.exports = function(){
    let searchLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
    "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0","1","1","2","3","4","5","6","7","8","9"];

    searchLetters.forEach(element => {
        connect(element);
    });

    function connect(query){
        let command = 'globaldir ' + query;
        const client = new net.Socket();
        let CACHEFILE = path.join(BASEDIR + '/files/dirCache_'+query+'.txt');
        fs.writeFileSync(CACHEFILE,'');
        client.connect(PORT, IP, ()=>{
            client.write(PASSWORD+'\r\n'+command+'\r\n');
            console.log('\n'+command)
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
            if(res){
                if(typeof res == Object) res.end();
            }
        });
        // fs.writeFileSync(DIRFILE,'');
        client.on('data', function(data){
            data = data.toString();
            fs.appendFileSync(CACHEFILE, data.toString());
            if (data.indexOf(command+' done') !== -1) {
                processGlobalDir(res, query);
                conn.end();
            }
        });
    }

    function processGlobalDir(res, query){ 
        streamData = fs.readFileSync(CACHEFILE);
        streamData = streamData.toString();
        streamData = streamData.split('\r\n');
        if (streamData.length > 20) {
            streamData = streamData.slice(20);
            // console.log(streamData);
            streamData.forEach(element => {
                // console.log(element)
                let details = {};
                element = element.replace(':', ' ')
                element = element.split(' ');
                element = element.filter(val => {
                    return val.trim().length !== 0;
                });
                if (element.length == 7) {
                    details['index'] = element[1].replace('.','');
                    details['id'] = element[2] + ' ' + element[3] + ' ' +  element[4] + ' ' + element[5];
                    details['type'] = element[6];
                    arr.push(details);
                } else if (element.length == 6) {
                    details['index'] = element[1].replace('.','');
                    details['id'] = element[2] + ' ' + element[3] + ' ' + element[4];
                    details['type'] = element[5];
                    arr.push(details);
                } else if (element.length == 5) {
                    details['index'] = element[1].replace('.','');
                    details['id'] = element[2] + ' ' + element[3];
                    details['type'] = element[4];
                    arr.push(details);
                } else if (element.length == 4){
                    details['index'] = element[1].replace('.','');
                    details['id'] = element[2];
                    details['type'] = element[3];
                    arr.push(details);
                }else{
                    details['index'] =  null;
                }
            });
            addDirectoryToDB(arr, dbConnection, query);
            fs.unlinkSync()
        }
    }
    function addDirectoryToDB(arr, dbHandler,query){
        console.log('adding data to database');
        arr.forEach(element => {
            let id = dbHandler.query('SELECT name FROM directories WHERE id = '+'"'+element.id+'"'+'');
            if(id.length == 0){ 
                dbHandler.query('INSERT INTO directories(name,dir_type,query,created_at) VALUES('+'"'+element.id+'"'+','+'"'+element.type+'"'+','+'"'+query+'"'+','+'"'+today+'"'+')');
            }else{
                dbHandler.query('INSERT INTO directories(name,dir_type) VALUES("")');
            }
        });
    }

    
}