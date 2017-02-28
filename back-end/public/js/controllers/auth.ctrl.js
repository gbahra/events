angular
  .module('events')
  .controller('authenticationController', authenticationController)

  function authenticationController(Auth, $state){
    var self = this;
    self.createUser = function(uid){

      Auth.$createUserWithEmailAndPassword(self.email, self.password).then(function(user){
        resetCredentials();

      }).catch(function(error){
        self.error = error;
      })
    }
    self.signOut = function(){
        Auth.$signOut();
        $state.go('home')
    }
    Auth.$onAuthStateChanged(function(user){

      self.user = user;
    })

    self.signIn = function(){
      Auth.$signInWithEmailAndPassword(self.email, self.password).then(function(user){
        resetCredentials();
        $state.go('home')
      }).catch(function(error){
        self.error = error;
      })
    }
    function resetCredentials(){
      self.email = "";
      self.password = "";
    }
  }
