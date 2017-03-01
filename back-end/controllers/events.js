var request = require('request');

function indexUsers(req, res){
  request('http://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.TOKENVARNAME + '&latitude=53.4839&longitude=-2.2446&radius=5&eventcode=LIVE&order=distance&description=1&limit=1', function (error, response, body) {
    if (error) {console.log(error)}
      res.json(response)
})

}

module.exports = {
  index : indexUsers
}
