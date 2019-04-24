const conference = require('../actions/conference');
const presentation = require('../actions/presentation');

module.exports = {
    Conference :  function(req, res){
        conference(res);
    },

    Presentation : function(req, res){
        presentation(res);
    },
}