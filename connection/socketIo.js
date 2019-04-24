const EventEmitter = require('events');
EventEmitter.defaultMaxListeners = 100;

const io = require('socket.io').listen(8001);
io.on('connection', ()=>{
    // console.log('connected to ismaila')
})

class Message extends EventEmitter{
    send(type, message){
        this.on(type, function(){
            io.emit(type, message)
        })
        this.emit(type)
    }
}

module.exports = Message
