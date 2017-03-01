angular
  .module('events')
  .controller('eventController',eventController)

function eventController(Events, $stateParams, $state){
  var self = this;

  self.getEvents = function(){
    Events.get().then(function(response){
      var body = JSON.parse(response.data.body)
      self.all = body.results
      console.log(self.all)
    })

  }
  self.getEvent = function(){
    Events.show($stateParams.event).then(function(response){
        var body = JSON.parse(response.data.body)
      self.event = body.results[0]
      console.log(self.event)
      }
    )
  }

}
