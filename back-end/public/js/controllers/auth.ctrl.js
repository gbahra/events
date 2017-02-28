angular
  .module('events')
  .controller('authenticationController', authenticationController)
  function authenticationController(User, Auth, $state){
    var self = this;
    self.newUser = {};
    self.createUser = function(){
      Auth.$createUserWithEmailAndPassword(self.email, self.password).then(function(user){
        resetCredentials();
        User.create({
          uid: user.uid,
          first_name: self.first_name,
          last_name: self.last_name,
          email: self.email,
          mobile_number: self.mobile_number,
          post_code: self.post_code
        }).then(function(response){
          self.newUser = {};
          $state.go('home', {id:response.user.uid})
        })
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
