require('../database/token');
module.exports = {
    getToken: function(token){
        if (token.includes('Bearer')) {
            token = token.split(' ');
            token = token[1];
            return token;
        }else{
            token = token.trim();
            return token;
        }
    },
    device: function(token){
        return deviceTokens.filter(element => element === token)[0]
    },
    tab: function(token){
        return tabTokens.filter(element => element === token)[0]
    },

}