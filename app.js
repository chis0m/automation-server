const app = require('./middleware').app;
const cp = require('child_process');
const processToken = require('./actions/processToken');
const getDevices = require('./database/devicesInRoom').roomDevices;
const Message = require('./connection/socketIo');
const io = new Message(); 

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
const roomRouter = require('./routes/room');
const projectorRouter = require('./routes/projector');

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
app.use('/api/room', roomRouter);
app.use('/api/projector', projectorRouter);

app.get('/api/room-details', function(req, res){
    token = processToken.getToken(req.headers['authorization'])
    res.send(getDevices(token))
});


//Call notification child process
let child = createNotificationService();
child.on("exit", () => {
	child = createNotificationService();
});
child.on("error", () => {
	child = createNotificationService();
});
child.on("close", () => {
	child = createNotificationService();
});
function createNotificationService() {
	return cp.fork(__dirname + '/children/notification.js');
}

child.on('message', function(data){
	io.send(Object.keys(data)[0], Object.values(data)[0])
})

app.listen(8000);