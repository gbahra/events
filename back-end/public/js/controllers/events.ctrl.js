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
        console.log(body.results)
        for(var i = 0; i<body.results.length; i++){
          if($stateParams.event === body.results[i].eventname){
            console.log('yhhhhh')
            self.show = body.results[i];
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
        for (var i = 0; i < response.data.results.length; i++ ){
          var array = JSON.parse(response.data.results[i])
          console.log(array)
          for(var j = 0; j<array.results.length; j++){
            for(var k = 0; k<res.data.user[0].favourites.length; k++){
              if(array.results[k].eventname === res.data.user[0].favourites[j]){
                results.push(array.results[j])
                break;
              }
            }
          }
        }
        self.fav = results
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

