angular
  .module('events')
  .factory('Events', eventsFactory)

function eventsFactory(API, $http){
  return{
    get: function(){
      $http.get(API+'/events')
    }
  }
}
