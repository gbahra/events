var request = require('request');

function indexEvents(req, res){
  var finalObj  = {};
  var increment = -1;
  request('http://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.TOKENVARNAME + '&country=GB&order=trending&description=1&limit=12',
    function (error, response, body) {
      console.log('1st req')
      var parseBody = JSON.parse(response.body)
      for(var i = 0; i < parseBody.results.length; i++){
        secondReq(parseBody, i, increment, finalObj);
      }
       // console.log(finalObj) //ASYNCHRONOUS


  })
}

function secondReq(parseBody, i, increment, finalObj){
  request('http://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.TOKENVARNAME + "&latitude=" + parseBody.results[i].venue.latitude + "&longitude=" + parseBody.results[i].venue.longitude + '&radius=100&order=distance&EventCode='+parseBody.results[i].EventCode +"&limit=100&description=1", function(err, res, bod){
      var bodyOfCheck = JSON.parse(res.body)
      for(var j = 0; j < bodyOfCheck.results.length; j++){
        if(parseBody.results[i].id === bodyOfCheck.results[j].id){
          var artists = [];
          increment++;
          for(var k = 0; k< bodyOfCheck.results[j].artists.length; k++){
            artists.push(bodyOfCheck.results[j].artists[k])
          }
          finalObj = {increment: artists};
          console.log(finalObj)
        }
      }
  })

}
function showEvents(req, res){
  request('http://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.TOKENVARNAME + '&keyword='+ req.params.event + '&limit=100', function (error, response, body) {
      if (error) return res.status(500).json(error)
      res.json(response)
    }
  )
}

function getLocationEvents(req, res){
  request('http://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.TOKENVARNAME + '&city='+ req.params.location, function (error, response, body) {
      if (error) return res.status(500).json(error)
      console.log(response)
      res.json(response)
    }
  )
}

module.exports = {
  index : indexEvents,
  show : showEvents,
  getLocationEvents : getLocationEvents
}
