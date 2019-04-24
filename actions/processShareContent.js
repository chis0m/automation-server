module.exports = function(streamData,res){
    let str = '';
    streamData = streamData.split('\r\n')
    if (streamData.length > 20) {
        streamData = streamData.slice(20)
        streamData.forEach(element => {
            str += element+' ';
        });
        let id = str.match(/\d+/)[0];
        res.send({ id : id })
    }
}
