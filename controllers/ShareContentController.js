const timer = require('../actions/timer');
const token = require('../actions/setTokens');
const client = require('../connection/groupseries');
const processResponse = require('../actions/processResponse');
const lutron = require('../connection/lutron')
const processShareContent = require('../actions/processShareContent');
let conn;

module.exports = {
   shareGet : function(req, res){
      let streamData = '';
      const command = "vcbutton source get";
      conn = client(command, res);
      // processResponse(conn, res)
      conn.on('data', (data)=>{
         streamData += data.toString('utf8');
         timer.clearTimer();
         timer.startTimer(function(){
             processShareContent(streamData,res);
             conn.end()
         });
     })
   }, 
   shareListSource : function(req, res){
      let streamData = '';
      const command = "vcbutton play 5";
      conn = client(command, res);
      // processResponse(conn,res);
      conn.on('data', (data)=>{
         streamData += data.toString('utf8');
         timer.clearTimer();
         timer.startTimer(function(){
             processResponse(streamData,res);
             conn.end()
         });
     })
   }, 
   shareMapGet : function(req, res){
      let streamData = ''
      const command = "vcbutton map get";
      conn = client(command, res);
      // processResponse(conn, res)
      conn.on('data', (data)=>{
         streamData += data.toString('utf8');
         timer.clearTimer();
         timer.startTimer(function(){
             processResponse(streamData,res);
             conn.end()
         });
     })
   }, 
   shareSourceGet : function(req, res){
      let streamData = ''
      const command = "vcbutton source get";
      conn = client(command, res);
      // processResponse(conn, res)
      conn.on('data', (data)=>{
         streamData += data.toString('utf8');
         timer.clearTimer();
         timer.startTimer(function(){
             processResponse(streamData,res);
             conn.end()
         });
     })   
   }, 
   shareStop : function(req, res){
      let streamData = ''
      const command = "vcbutton stop";
      lutron("4", res)
      conn = client(command, res);
      conn.on('data', (data)=>{
         streamData += data.toString('utf8');
         timer.clearTimer();
         timer.startTimer(function(){
             processResponse(streamData,res);
             conn.end()
         });
     })
   }, 
   sharePlay : function(req, res){
      let streamData = ''
      const command = "vcbutton play "+req.body.operation;
      lutron("2", res)
      conn = client(command, res);
      conn.on('data', (data)=>{
         streamData += data.toString('utf8');
         timer.clearTimer();
         timer.startTimer(function(){
            processResponse(streamData,res);                
            conn.end()
         });
      })
   }, 
   shareMap : function(req, res){
      let streamData = ''
      const command = "vcbutton map "+req.body.operation;
      conn = client(command, res);
      conn.on('data', (data)=>{
         streamData += data.toString('utf8');
         timer.clearTimer();
         timer.startTimer(function(){
             processResponse(streamData,res);               
              conn.end()
         });
     }) 
   }
}