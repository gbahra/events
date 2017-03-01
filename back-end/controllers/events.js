var request = require('request');

function indexEvents(req, res){
  request('http://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.TOKENVARNAME + '&country=GB&order=trending&description=1&limit=12',
    function (error, response, body) {
    if (error) {console.log(error)}
      res.json(response)
    }
  )
}
function showEvents(req, res){
  request('http://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.TOKENVARNAME + '&keyword='+ req.params.event, function (error, response, body) {
      if (error) return res.status(500).json(error)
      res.json(response)
    }
  )
}

module.exports = {
  index : indexEvents,
  show : showEvents
}
