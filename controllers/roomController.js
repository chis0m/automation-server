const conference = require('../actions/conference');
// const presentation = require('../actions/old_presentation');
const lutron = require('../connection/lutron');

module.exports = {
    Conference :  function(req, res){
        conference(res);
    },

    Presentation : function(req, res){
        lutron("2",res);
        // presentation(res);
    },
}