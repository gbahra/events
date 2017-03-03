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
        console.log(results)
        var tmp = [];
        for(var i = 0; i < results.length; i++){
          if(tmp.indexOf(results[i]) === -1){
            tmp.push(results[i]);
          }
        }
        self.fav = tmp
        console.log(tmp)
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

