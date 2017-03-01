var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');
var eventsController = require('../controllers/events');

//users
router.route('/api/users')
  .get(usersController.index)
  .post(usersController.create);

router.route('/api/users/:id')
  .patch(usersController.update)
  .get(usersController.show)
  .delete(usersController.delete);


//events
router.route('/api/events')
  .get(eventsController.index);

router.route('/api/events/:event')
  .get(eventsController.show);


module.exports = router;
