const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const processToken = require('./actions/processToken');
const setToken = require('./actions/setTokens');

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, X-Auth-Token, Origin, Authorization, Device-token');
    if (req.method === "OPTIONS") {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.status(200).json({})
    }
    next();
});

app.use(bodyParser.json())

app.use(function(req, res, next){
    const bearerHeader = req.headers['authorization'] || "no bearer";
    const deviceHeadToken = req.headers['device-token'] || 'noToken';
    // console.log(bearerHeader, deviceHeadToken)
    let tabToken = processToken.getToken(bearerHeader);
    let deviceToken = processToken.getToken(deviceHeadToken);
    // console.log(tabToken, deviceToken)
    tabToken = processToken.tab(tabToken);
    deviceToken = processToken.device(deviceToken);
    // console.log(tabToken, deviceToken)
    if (!tabToken) {
        // res.sendStatus(403);
        res.status(403).end("Forbidden: Check TAB Authentication token")
    }else{
        setToken.setToken(tabToken,deviceToken)
        next();
    }
})

// io.on('connect', function(socket){
//     onConnect
// })

module.exports = {
    app,
    // onConnect: function(type, data){
    //     io.emit(type, data)
    // }
}