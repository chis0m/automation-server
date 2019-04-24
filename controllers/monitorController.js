const token = require('../actions/setTokens');
const vmonitor = require('../connection/vmonitor');
const pmonitor = require('../connection/pmonitor');
// let conn;

module.exports = {
    MonitorOn :  function(req, res){
        const command = 'on';
        pmonitor(command, res);
    },

    MonitorOff : function(req, res){
        const command = 'off';
        pmonitor(command, res);
    },

    MonitorVolume : function(req, res){
        const command = req.body.volume
        vmonitor(command, res);
    },

    MonitorGetVolume : function(req, res){
       const command = 'get'; 
       vmonitor(command, res);
    },

}