let tabToken = null;
let deviceToken = null;
module.exports = {
    tabToken,
    deviceToken,
    setToken: function(tabToken, deviceToken){
        this.tabToken = tabToken;
        this.deviceToken = deviceToken
    },

}