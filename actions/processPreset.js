module.exports = function(data){
    // console.log(data)
    let str = data.toString();
    let others = str.match(/(preset )[a-zA-Z0-9\s]+/g);
    if (others !== null) {
        return others[0];
    }
    console.log(others)
    return others;
}