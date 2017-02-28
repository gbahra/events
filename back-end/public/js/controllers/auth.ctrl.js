angular
  .module('events')
  .controller('authenticationController', authenticationController)

  function authenticationController(Auth, $state){
    var self = this;
    self.createUser = function(){
      Auth.$createUserWithEmailAndPassword(self.email, self.password).then(function(user){
        resetCredentials();
        console.log(user)
      }).catch(function(error){
        self.error = error;
      })
    }
    self.signOut = function(){
        Auth.$signOut();
        $state.go('home')
    }
    Auth.$onAuthStateChanged(function(user){
      console.log(user);
      self.user = user;
    })

    self.signIn = function(){
      Auth.$signInWithEmailAndPassword(self.email, self.password).then(function(user){
        resetCredentials();
        $state.go('secret')
      }).catch(function(error){
        self.error = error;
      })
    }
    function resetCredentials(){
      self.email = "";
      self.password = "";
    }
  }
