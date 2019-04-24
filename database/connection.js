const MySql = require('sync-mysql');

let connection = new MySql({
    host: "localhost",
    user: "root",
    password: "",
    database: "realpresence"
});

module.exports = connection