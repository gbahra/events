angular
  .module('events')
  .factory('User', userFactory)

function userFactory(API, $http){
  return{
    create: function(user){
      return $http.post(API+'/users', user)
    },
    getUser: function(uid){
      return $http.get(API+'/users/' + uid)
    },
    favourite: function(eventObj){
      return $http.put(API+'/users/' + eventObj.uid, eventObj)
    },
    getFavourite: function(uid){
      return $http.get(API+'/users/favourite' + uid)
    },
    update: function(user){
      return $http.patch(API + '/users/' + user.uid, user)
    },
    delete: function(uid){
      return $http.delete(API+'/users/' + uid)
    },
    update: function(uid){
      return $http.patch(API+'/users/' + uid)
    }
  }
}
