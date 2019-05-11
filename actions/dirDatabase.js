const dbConnection = require('../database/connection');

module.exports = function(res, query){
    let arr = dbConnection.query('SELECT * FROM directories WHERE query = '+'"'+query+'"'+'');
    res.send({directory_data : arr});
}