angular
  .module('events')
  .controller('eventController',eventController)

function eventController(Events, $stateParams, $state){
  var self = this;

  self.getEvent = function(){
    Events.get().then(function(response){
      var body = JSON.parse(response.data.body)
      self.all = body.results
      console.log(self.all)
    })
  }
  return self
}
