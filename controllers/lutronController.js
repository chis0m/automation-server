
const token = require('../actions/setTokens');
const lutron = require('../connection/lutron')

module.exports = {
    LutronScene : function(req, res){
        let command = req.body.operation
        lutron(command, res,token.tabToken, token.deviceToken);
        // lutron(command, res);
    },
}