angular
  .module('events')
  .controller('userController',userController)

function userController(Auth, User, $stateParams, $state){
  var self = this;

  self.favourite = function(eventObj){
    console.log(eventObj)
    eventObj.uid = Auth.$getAuth().uid
    console.log(eventObj)
    User.favourite({ term: eventObj}).then(function(response){
      console.log(response)
    })
  }

}
