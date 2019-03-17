const express = require('express');
var bodyParser = require('body-parser')
const app = express()
const verifyToken = require('./actions/verifyToken')
app.use(bodyParser.json())

app.use(function(req, res, next){
    const bearerHeader = req.headers['authorization'] || "no bearer";
    const bearer = bearerHeader.split(' ');
    const tabToken = bearer[1];
    const deviceToken = req.headers['device-token'].trim() || 'noToken';
    if (!(tabToken && verifyToken.tab(tabToken)) || !(deviceToken && verifyToken.device(deviceToken))) {
        res.sendStatus(403);
    }else{
        next();
    }
})

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

//Routers
const volumeRouter = require('./routes/volume');
const shareContentRouter = require('./routes/shareContent');
const directoryRouter = require('./routes/directory.js');
const globalDirRouter = require('./routes/globalDir.js');
const cameraRouter = require('./routes/camera');
const presetRouter = require('./routes/preset');
const callRouter = require('./routes/call');
const buttonRouter = require('./routes/button');
const calendarRouter = require('./routes/calendar');
const monitorRouter = require('./routes/monitor');
const wemoRouter = require('./routes/wemo');
const modeRouter = require('./routes/mode');
const lutronRouter = require('./routes/lutron');

//Routes
app.use('/api/volume', volumeRouter);
app.use('/api/directory', directoryRouter);
app.use('/api/globaldir', globalDirRouter);
app.use('/api/share-content', shareContentRouter);
app.use('/api/camera', cameraRouter);
app.use('/api/preset', presetRouter);
app.use('/api/call', callRouter);
app.use('/api/button', buttonRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/monitor', monitorRouter);
app.use('/api/wemo', wemoRouter);
app.use('/api/lutron', lutronRouter);
app.use('/api/mode', modeRouter);

app.get('/api/room-details', function(req, res){
    res.json({verifyToken})
});

app.listen(3000, 'localhost');