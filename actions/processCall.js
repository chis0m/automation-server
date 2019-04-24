module.exports = function(data){
    let str = data.toString()
    str = str.match(/(dialing)[\s]+[manual|phone]+[\s]?(voice)?/g);
    if (str !== null) {
        return str[0];
    }
    return str;
}