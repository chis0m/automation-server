const connection = require('./connection');

const tabs = connection.query('SELECT api_token FROM tabs');
const devices = connection.query('SELECT device_token FROM devices');

tabTokens = tabs.map(element => element.api_token);
deviceTokens = devices.map(element => element.device_token);


module.exports = {
    tabTokens,
    deviceTokens
}