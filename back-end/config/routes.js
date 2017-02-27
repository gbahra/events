var express = require('express');
var router = express.Router();
var eventsController = require('../controllers/events');
var usersController = require('../controllers/users');

//users
router.route('api/users')
  .post(usersController.create);

router.route('api/users/:id')
  .patch(usersController.update)
  .get(usersController.show)
  .delete(usersController.delete);

 // API section
 // router.route('/api/events')
 //   .get(eventsApiController.index)
 //   .post(eventsApiController.create);

 // router.route('/api/events/:id')
 //   .get(eventsApiController.show)
 //   .put(eventsApiController.update)
 //   .patch(eventsApiController.ajax)
 //   .delete(eventsApiController.delete);

// events


module.exports = router;
