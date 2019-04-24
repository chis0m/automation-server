module.exports = function(data, res){
    // let others = data.match(/(camera)[\s]*[a-zA-Z0-9]+/g);
    let getPosition = data.match(/(camera near position )[0-9\-\s]+/g)
    if (getPosition !== null) {
        getPosition = getPosition[0].replace('\r\n', '');
        getPosition = getPosition.replace('-', '');
        getPosition = getPosition.replace('camera near position', '');
        getPosition = getPosition.trim();
        getPosition = getPosition.split(' ');
        console.log({X:getPosition[0],'Y':getPosition[1],'Z':getPosition[2]})
        res.send({X:getPosition[0],'Y':getPosition[1],'Z':getPosition[2]});
    }else{
        return res.send({response: null});
    }
}