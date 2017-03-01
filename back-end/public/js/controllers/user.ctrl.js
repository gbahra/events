angular
  .module('events')
  .controller('userController',userController)

function userController(User, $stateParams, $state){
  var self = this;

  self.favourite = function(event){
    console.log(event)


  }

}
