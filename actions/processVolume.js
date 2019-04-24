module.exports = function(streamData,res){
    let str = '';
    streamData = streamData.split('\r\n')
    if (streamData.length > 20) {
        streamData = streamData.slice(20);
        str = streamData[0];
        let volume = str.match(/\d+/)[0];
        res.send({ volume })
    }
}