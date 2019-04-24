module.exports = function(streamData, res){
    streamData = streamData.split('\n')
    if (streamData.length > 20) {
        streamData = streamData.slice(20);
        streamData.forEach(element => {
            let meetings = {}
            element = element.split('|');
            if (element.length > 1) {
                meetings['name'] = element[4];
                meetings['start'] = element[2];
                meetings['end'] = element[3];
                arr.push(meetings);
            }
        });
        console.log(arr)
        res.send({meetings : arr})
    }  
}