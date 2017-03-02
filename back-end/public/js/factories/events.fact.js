angular
  .module('events')
  .factory('Events', eventsFactory)

function eventsFactory(API, $http){
  return{
    get: function(){
     return $http.get(API+'/events')
    },
    show: function(event){
     return $http.get(API+'/events/' + event)
    },
    update: function(uid){
      return $http.patchs(API+'/users/' + uid)
    }
  }
}
