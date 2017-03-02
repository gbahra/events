angular
  .module('events')
  .controller('userController',userController)

function userController(Auth, User, $stateParams, $state){
  var self = this;
  self.user = {};
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
      .then(function(response){
        self.user = response.data.user[0];
        console.log(self.user)
      })
  }
  self.updateUser = function () {
    User.update(self.user)
      .then(function(response){
        console.log('yhhh')
        $state.reload()
      })
  }
  self.delete = function(){
    var uid = Auth.$getAuth().uid;
    var user = firebase.auth().currentUser;
    user.delete().then(function(response){
      console.log('firebase delete')
    })
    User.delete(uid).then(function(response){
      console.log(' db delete')
      $state.go('home')
      })

  }
}
