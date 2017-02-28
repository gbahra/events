angular
  .module('events')
  .factory('Events', eventsFactory)

function eventsFactory(API, $http){
  return{
    get: function(){
      return $http.get(API+'events/search/?api_key=abcdefghijklmnop&latitude=53.4839&longitude=-2.2446&radius=5&eventcode=LIVE&order=distance&description=1')
    }
  }
}
