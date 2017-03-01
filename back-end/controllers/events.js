var request = require('request');

function indexUsers(req, res){
  request('http://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.TOKENVARNAME + '&country=GB&order=trending&description=1&limit=12', function (error, response, body) {
    if (error) {console.log(error)}
      res.json(response)
})

}

module.exports = {
  index : indexUsers
}
