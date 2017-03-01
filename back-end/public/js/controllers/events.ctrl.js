angular
  .module('events')
  .controller('eventController',eventController)

function eventController(Events, $stateParams, $state){
  var self = this;

  self.getEvent = function(){
    Events.get().then(function(response){
      self.all = JSON.parse(response.data.body)
      console.log(self.all.results[0])
    })
  }
  return self
}
