angular
  .module('events')
  .controller('eventController',eventController)

function eventController(Events, $stateParams, $state){
  var self = this;

  self.getEvent = function(){
    Events.get().then(function(response){
      console.log(response)
    })
  }
  return self

}
