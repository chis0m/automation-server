const allDevices = require('./allDevices')
module.exports = {
    roomDevices: function(tabToken){
    return allDevices[tabToken];
    },

    oneDevice: function(tabToken,deviceToken){
        return this.roomDevices(tabToken).filter(element => element.device_token == deviceToken)[0]
    }    
}