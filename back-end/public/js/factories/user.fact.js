angular
  .module('events')
  .factory('User', userFactory)

function userFactory(API, $http){
  return{
    create: function(user){
      return $http.post(API+'/users', user)
    },
    favourite: function(eventObj){
      return $http.patch(API+'/users/' + eventObj.uid, eventObj)
    }
  }
}
