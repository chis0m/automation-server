const fs = require('fs');
const path = require('path');
const timer = require('../actions/timer');
const client = require('../connection/groupseries');
const BASEDIR = path.dirname(__dirname);
const DIRFILE = path.join(BASEDIR + '/files/directory.txt');
const dirDatabase = require('../actions/dirDatabase');
const processGlobalDir = require('../actions/processGlobalDir');
let conn;
module.exports = {
    globalDirGroupList : function(req, res) {
        
    },
    globalDirSearchDatabase : function(req, res) {
        const query = req.body.operation;
        dirDatabase(res,query);
    },
    globalDirSearch : function(req, res) {
        const command = 'globaldir ' + '"' + req.body.operation + '"' + '';
        let string = 'globaldir' + ' ' + req.body.operation + ' ' + 'done';
        const query = req.body.operation;
        conn = client(command, res);
        // fs.writeFileSync(DIRFILE,'');
        processGlobalDir(res,query,false);
        conn.end();
        // conn.on('data', (data)=>{
        //     // fs.appendFileSync(DIRFILE, data.toString());
        //     if (data.indexOf(string) !== -1) {
        //         processGlobalDir(res,false);
        //         conn.end();
        //     }
        // });
    },
    globalDirSave : function(req, res) {
        const command = 'globaldir ' + '"' + req.body.operation + '"' + '';
        let string = 'globaldir' + ' ' + req.body.operation + ' ' + 'done';
        const query = req.body.operation;
        conn = client(command, res);
        // fs.writeFileSync(DIRFILE,'');
        processGlobalDir(res,query,true);
        conn.end();
        // conn.on('data', (data)=>{
        //     // fs.appendFileSync(DIRFILE, data.toString());
        //     if (data.indexOf(string) !== -1) {
        //         processGlobalDir(res,save);
        //         conn.end();
        //     }
        // });
    },
    globalDirSearchSize : function(req, res) {
        
    },
    globalDirEntry : function(req, res) {
        
    },
    globalDirRange : function(req, res) {
        
    },
    globalDirSearchRange : function(req, res) {
        
    },
    globalDirGroupListId : function(req, res) {
        
    },
    globalDirStringId : function(req, res) {
        
    },
    globalDirRangeId : function(req, res) {
        
    },
    globalDirRangeSearchId : function(req, res) {
        
    }
}