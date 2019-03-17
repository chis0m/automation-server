require('../database/token');
module.exports = {
    device: function(token){
        return deviceTokens.filter(element => element === token)[0]
    },
    tab: function(token){
        return tabTokens.filter(element => element === token)[0]
    },
}