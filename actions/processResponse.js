module.exports = function(streamData,res){
    let str = '';
    streamData = streamData.split('\r\n')
    if (streamData.length > 21) {
        streamData = streamData.slice(20)
        streamData.forEach(element => {
            str += element+' ';
        });
        res.end();
        return;
    }
}
