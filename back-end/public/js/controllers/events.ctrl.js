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
    self.show = {}
    console.log($stateParams.event)
    Events.show($stateParams.event).then(function(response){
        var body = JSON.parse(response.data.body)
        var eventNameRexExp = new RegExp($stateParams.event, 'i')
        self.show = body.results.filter(function (event) {
          console.log(eventNameRexExp.test(event.eventname))
          return eventNameRexExp.test(event.eventname)
        })

      }
    )
  }
  self.favourite = function(){
    Criminal.update(id, self.oneCriminal)
      .then(function (response) {


      })
  }

}
