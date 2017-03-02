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


  self.getUser = function () {
    var uid = Auth.$getAuth().uid;
    User.getUser(uid)
      .then(function (response) {
        console.log(response)
        // self.user = response.data.criminal
      })
  }
  self.updateUser = function () {
    // var id = $stateParams.id
    // Criminal.update(id, self.user)
    //   .then(function (response) {
    //     self.user = {}
    //   })
  }


}
