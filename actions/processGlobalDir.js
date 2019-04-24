const fs = require('fs');
const path = require('path');
let BASEDIR  = path.dirname(__dirname);
let file = path.join(BASEDIR + '/files/directory.txt');
let arr = [];
// module.exports = function(streamData,string, res){
module.exports = function(res){
    streamData = fs.readFileSync(file);
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
                // arr.pop(details);
            }
            // arr.push(details);
        });
        console.log({directory_data : arr});
        res.send({directory_data : arr});
    }
}