var User= require("../models/user");
var Shoe= require("../models/shoes");
var bodyParser = require('body-parser');


// router.route('/')
//       .get(eventsController.index);

// router.route('/:id')
//       .get(eventsController.show);


module.exports = {
  index : indexEvents,
  show : showEvents
}
