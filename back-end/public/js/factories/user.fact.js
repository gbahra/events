angular
  .module('events')
  .factory('User', userFactory)

function userFactory(API, $http){
  return{
    create: function(user){
      return $http.post(API+'/api/users', user)
    }
  }
}
