const timer = require('../actions/timer');
const token = require('../actions/setTokens');
const client = require('../connection/groupseries');
const processDirectory = require('../actions/processDirectory');
let conn;
module.exports = {
    directoryGetAll : function(req, res) {
        // const command = "gaddrbook all";
        const command = "globaldir all";
        let check = 'all'
        let streamData = '';
        conn = client(command, check, res);
        conn.on('data', (data)=>{
            streamData += data.toString();
            timer.clearTimer();
            timer.startTimer(function(){
                processDirectory(streamData,res);
                conn.end();
            });
        })
    },
    // directoryGetAll : function(req, res) {
        // const command = "gaddrbook all";
    //     const command = "gaddrbook all";
    //     let check = 'all'
    //     let streamData = '';
    //     conn = client(command, check, res);
    //     conn.on('data', (data)=>{
    //         streamData += data.toString();
    //         timer.clearTimer();
    //         timer.startTimer(function(){
    //             processDirectory(streamData,res);
    //             conn.end()
    //         });
    //     })
    // },
    directoryGroupListSize : function(req, res) {
        const command = "gaddrbook grouplist size";
        conn = client(command, res);
        processDirectory(conn, res);

    },
    directoryBatch : function(req, res) {
        const command = "gaddrbook batch "+req.body.operation;
        conn = client(command, res);
        processDirectory(conn, res);

    },
    directoryBatchDefine : function(req, res) {
        const command = "gaddrbook batch define "+req.body.start_no+" "+req.body.stop_no;
        conn = client(command, res);
        processDirectory(conn, res);

    },
    directoryBatchSearch : function(req, res) {
        const command = "gaddrbook batch search "+req.body.pattern+" "+req.body.count;
        conn = client(command, res);
        processDirectory(conn, res);

    },
    directoryLetter : function(req, res) {
        const command = "gaddrbook letter "+req.body.letter+" "+req.body.letter;
        conn = client(command, res);
        processDirectory(conn, res);
    },
    directoryRange : function(req, res) {
        const command = "gaddrbook range "+req.body.start_no+" "+req.body.stop_no;
        conn = client(command, res);
        processDirectory(conn, res);
    },
    directoryGroupList : function(req, res) {
        const command = "gaddrbook grouplist "+req.body.range_start+" "+req.body.range_end;
        conn = client(command, res);
        processDirectory(conn, res);
    },
    directoryGroupNameSize : function(req, res) {
        const command = "gaddrbook group "+req.body.group_name+" size";
        conn = client(command, res);
        processDirectory(conn, res);
    },
    directoryGroupNameRange : function(req, res) {
        const command = "gaddrbook "+req.body.group_name+" "+req.body.range_start+" "+req.body.range_end;
        conn = client(command, res);
        processDirectory(conn, res);
    },
    directoryNameSearch : function(req, res) {
        const command = "gaddrbook names search "+req.body.search_pattern+" size";
        conn = client(command, res);
        processDirectory(conn, res);
    },
    directoryNameSearchRange : function(req, res) {
        const command = "gaddrbook names search "+req.body.search_pattern+" "+req.body.range_start+" "+req.body.range_end;
        conn = client(command, res);
        processDirectory(conn, res);
    },
    directoryAddressSysId : function(req, res) {
        const command = "gaddrbook address "+req.body.sys_id_string;
        conn = client(command, res);
        processDirectory(conn, res);
    }
}