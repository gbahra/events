var request = require('request');

function indexEvents(req, res){

  var finalObj  = {};
  var increment = 0;
  request('http://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.TOKENVARNAME + '&country=GB&order=trending&description=1&limit=12',
    function (error, response, body) {
      var parseBody = JSON.parse(response.body)
      for(var i = 0; i<parseBody.results.length; i++){
        console.log(i)
        request('http://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.TOKENVARNAME + '&EventCode='+parseBody.results[i].EventCode, function(err, res, bod){
          console.log("yhhhhh" + i)//PROBLEM IS ITERATING THROUGH THIS BITCH BECAUSE IT ITERATES THEN DOES THE RESQUESTS
          var bodyOfCheck = JSON.parse(res.body)
          for(var j = 0; j < bodyOfCheck.results.length; j++){
            if(parseBody.results[i].id === bodyOfCheck.results[j].id){
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
