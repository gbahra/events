var request = require('request');

function indexEvents(req, res){
  var finalObj  = {};
  var increment = 0;
  request('http://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.TOKENVARNAME + '&country=GB&order=trending&description=1&limit=12',
    function (error, response, body) {
      var parseBody = JSON.parse(response.body)
      for(var i = 0; i < parseBody.results.length; i++){
        secondReq(parseBody, i);
      }
  })
}

function secondReq(parseBody, i, increment){
  request('http://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.TOKENVARNAME + "&city=" + parseBody.results[i].venue.town + "&limit=100", function(err, res, bod){
      var bodyOfCheck = JSON.parse(res.body)
      for(var j = 0; j < bodyOfCheck.results.length; j++){
        //console.log(parseBody.results[i].id, bodyOfCheck.results[j].id)
        // '&EventCode='+parseBody.results[i].EventCode +"&venue.id=" + parseBody.results[i].venueid +

        if(parseBody.results[i].id === bodyOfCheck.results[j].id){
          console.log('yhhhhhhhhhhhh')
          var artists = [];
          increment++;
          for(var k = 0; k< body.results[j].artists; k++){
            artists.push(body.results[j].artists[k])
          }
          finalObj.increment = artists;
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

module.exports = {
  index : indexEvents,
  show : showEvents
}
