angular
  .module('events')
  .factory('User', userFactory)

function userFactory(API, $http){
  return{
    create: function(){
      return $http.post(API+'api/users', newUser)
    }
  }
}
