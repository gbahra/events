angular
  .module('events')
  .controller('userController',userController)

function userController(User, $stateParams, $state){
  var self = this;

  self.favourite = function(event){
    console.log(event)
    User.favourite(event).then(response){
      console.log(response)
    }
  }

}
