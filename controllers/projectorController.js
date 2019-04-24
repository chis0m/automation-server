const projector = require('../connection/projector');
module.exports = {
    ProjectorOn : function(req, res){
        let command = "on";
        projector(command, res);
    },
    ProjectorOff : function(req, res){
        let command = "off";
        projector(command, res);
    },
}