var request = require('request');

function indexEvents(req, res){
  var finalObj  = {};

  request('http://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.TOKENVARNAME + '&country=GB&order=trending&description=1&limit=12',
    function (error, response, body) {
      var parseBody = JSON.parse(response.body)
      for(var i = 0; i < parseBody.results.length; i++){
        secondReq(parseBody, i, finalObj,req,res);
      }
  })
}


function secondReq(parseBody, i, finalObj, req, res){
  request('http://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.TOKENVARNAME + "&latitude=" + parseBody.results[i].venue.latitude + "&longitude=" + parseBody.results[i].venue.longitude + '&radius=100&order=distance&EventCode='+parseBody.results[i].EventCode +"&limit=100&description=1", function(err, response, bod){
      var bodyOfCheck = JSON.parse(response.body)
      for(var j = 0; j < bodyOfCheck.results.length; j++){
        if(parseBody.results[i].id === bodyOfCheck.results[j].id){
          var artists = [];
          for(var k = 0; k< bodyOfCheck.results[j].artists.length; k++){
            artists.push(bodyOfCheck.results[j].artists[k])
          }
          finalObj[parseBody[i].eventname] = artists;
        }
      }
      res.status(200).json(finalObj, parseBody);
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
