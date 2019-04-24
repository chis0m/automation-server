const  connection = require('./connection')
let devices = {};


const tabTokens =  connection.query('SELECT api_token FROM tabs');

tabTokens.forEach(element => {
    const tab =  connection.query('SELECT * FROM tabs WHERE api_token = '+'"'+element.api_token+'"');
    const deviceArray = connection.query('SELECT * FROM devices WHERE room_id = '+'"'+tab[0].room_id+'"')
    devices[element.api_token] = deviceArray
});

module.exports = devices

