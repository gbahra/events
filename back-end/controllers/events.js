var request = require('request');


function indexUsers(req, res){
  request('http://www.skiddle.com/api/v1/events/search/?api_key=' process.env.TOKENVARNAME'&latitude=53.4839&longitude=-2.2446&radius=5&eventcode=LIVE&order=distance&description=1', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body) // Print the google web page.
     }
})

}

module.exports = {
  index : indexUsers
}
