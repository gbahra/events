angular
  .module('events')
  .controller('eventController',eventController)

function eventController(Auth, User, Events, $stateParams, $state){
  var self = this;
  self.searchTerm = '';

  self.getEvents = function(){
    Events.get().then(function(response){
      var body = JSON.parse(response.data.body)
      self.all = body.results

    })

  }
  self.getEvent = function(){
    self.show = {}
    console.log($stateParams.event)
    Events.show($stateParams.event).then(function(response){
        var body = JSON.parse(response.data.body)
        self.show = body.results[0];//NOT A REAL CHECK JUST LIKELY TO BE TRUE
        // var eventNameRexExp = new RegExp($stateParams.event, 'i')
        // self.show = body.results.filter(function (event) {
        //   console.log(eventNameRexExp.test(event))
        //   return eventNameRexExp.test(event.eventname)
        // })
      }
    )
  }
  self.getFavourites = function(){
    self.fav = {}
    var uid = Auth.$getAuth().uid
    User.getFavourite(uid).then(function(response){
      console.log(response)
    })


  }
  self.search = function(){
    console.log(self.searchTerm)
    Events.show(self.searchTerm).then(function(response){
        var body = JSON.parse(response.data.body)
        self.searchItems = body
        console.log(body)
      }
    )
  }
}

