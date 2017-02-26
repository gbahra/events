var User= require("../models/user");
var Shoe= require("../models/shoes");
var bodyParser = require('body-parser');

 // router.route('/users')
 //      .post(usersController.create);

 // router.route('/users/new')
 //      .get(usersController.new);

 // router.route('/users/edit/:id')
 //      .get(usersController.edit);

 // router.route('users/:id')
 //      .patch(usersController.update)
 //      .get(usersController.show)
 //      .delete(usersController.delete);

modules.export = {
  show : showUsers,
  new : newUsers,
  create : createUsers,
  edit : editUsers,
  update : updateUsers,
  delete : deleteUsers
}
