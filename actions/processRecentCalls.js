module.exports = function(streamData, res){ 
    let strArray = [];
    streamData = streamData.split('\r\n')
    if (streamData.length > 20) {
        streamData = streamData.slice(20)
        streamData.forEach(element => {
            let recentCallObject = {}
            element = element.replace(/[\n]/, "")
            element = element.replace(/[\r\n]/, "")
            element = element.split("\t");
            recentCallObject['id'] = element[0];
            recentCallObject['time'] = element[1];
            recentCallObject['direction'] = element[2];
            strArray.push(recentCallObject)
        });
        console.log({recent_calls: strArray})
        res.send({recent_calls: strArray})
    }   
}