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
      console.log(self.all)
    })
  }

  self.getLocationEvents = function(){
    self.locationEvents = {};
    var correctCityArray = [];
    Events.getLocationEvents($stateParams.location).then(function(response){
      var body = JSON.parse(response.data.body)
      for(var i = 0; i < body.results.length; i++){
        console.log(body.results[i].venue.town, $stateParams.location)
        if(body.results[i].venue.town === $stateParams.location){
          correctCityArray.push(body.results[i])
        }
      }
      self.locationEvents = correctCityArray
    })
  }

  self.getEvent = function(){
    self.show = {}
    console.log($stateParams.event)
    Events.show($stateParams.event).then(function(response){
        var body = JSON.parse(response.data.body)
        console.log(body.results)
        for(var i = 0; i<body.results.length; i++){
          if($stateParams.event === body.results[i].eventname){
            console.log('yhhhhh')
            self.show = body.results[i];
            console.log(self.show)
            return;
          }
          else{
            console.log('nahhh')
          }
        }
      }
    )
  }

  self.getFavourites = function(){
    self.fav = []
    var uid = Auth.$getAuth().uid
    var results = []
    User.getFavourite(uid).then(function(response){
      User.getUser(uid).then(function(res){
        for (var i = 0; i < response.data.results.length; i++){
          var array = JSON.parse(response.data.results[i])
          console.log(array)
          for(var j = 0; j<res.data.user[0].favourites.length; j++){
            for(var k = 0; k<array.results.length; k++){
              if(res.data.user[0].favourites[j] === array.results[k].eventname){
                results.push(array.results[k])
              }
            }
          }
        }
        var newArr = []
        var currentEventIDs = ''
        for (var i = 0; i < results.length; i++ ) {
          var currentIDregExp = new RegExp(results[i].id, 'i')
          if (!currentIDregExp.test(currentEventIDs)) {
            newArr.push(results[i])
            currentEventIDs += results[i].id + '|'
          }
        }
        self.fav = newArr
      })
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

