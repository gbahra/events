var express = require('express');
var router = express.Router();
var eventsController = require('../controllers/events');
var usersController = require('../controllers/users');
// var eventsApiController = require('../controllers/api/events');

//users

 router.route('/users')
      .post(usersController.create);

 router.route('/users/new')
      .get(usersController.new);

 router.route('/users/edit/:id')
      .get(usersController.edit);

 router.route('users/:id')
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
router.route('/')
      .get(eventsController.index);

router.route('/:id')
      .get(eventsController.show);

module.exports = router;
