var User= require("../models/User");
var bodyParser = require('body-parser');
var request = require('request');
var rP = require('request-promise');
var sendmail = require('sendmail')({silent: true})
var https = require('https');

function indexUsers(req, res){
  User.find({} , function(err, users) {
    if(err) return res.status(500).json(err);
    res.status(200).json({
      users: users
    });
  });
}

function showUsers(req, res) {
  User.find({uid: req.params.id}, function(err, user) {
    if(!user) return res.status(404).send("Not found");
    if(err) return res.status(500).send(err);
    console.log(user)
    res.json({
     user : user
    });
  });
}

function getFavouriteUsers(req, res){
  var resObj = [];
  User.findOne({uid:req.params.id} , function(err, user) {
    if(!user) return res.status(404).send("Not found");
    if(err) return res.status(500).send(err);

    var promiseArr = []
    for(var i = 0; i < user.favourites.length; i++){
      promiseArr.push(newAPIpromise(user.favourites[i]));
    }
    console.log(promiseArr)
    Promise.all(promiseArr).then(function (responseArr) {
      console.log(responseArr.length)
        return res.status(200).json({ 'results': responseArr });
    }).catch(function (err) {
      console.log(err)
      return res.status(500).json({ 'err': err });
    })
  });

}
function  newAPIpromise (favourite) {
  return new Promise (function (resolve, reject) {
    rP('http://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.TOKENVARNAME + '&keyword='+ favourite + '&limit=100')
        .then(resolve)
        .catch(reject)
  })
}

function createUsers(req, res){
  User.create(req.body, function(err, user){
    if (err) {
      console.log(err)
      return res.status(500).json(err)
    }
    console.log(user.email);
    sendmail({
      from: 'gurpal_bahra@hotmail.co.uk',
      to: user.email,
      subject: 'Welcome to eventListener',
      html: 'Welcome to eventListener'
    }, function (err, reply) {
      console.log(err && err.stack)
      console.dir(reply)
    })
    res.status(201).json({ user: user });
  });
}

function favouriteUsers(req, res){
  User.findOneAndUpdate(
    {uid: req.body.term.uid},
    {$addToSet : {favourites: req.body.term.event}},
    {new: true},
    function(err, user){
      console.log(user.mobile_number)
      var data = JSON.stringify({
        api_key: '372fcf4d',
        api_secret: '49224acfd0d88410',
        to: '44' + user.mobile_number,
        from: '441632960961',
        text: 'You favourited this event' + user.favourites[user.favourites.length-1]
      });

      var options = {
        host: 'rest.nexmo.com',
        path: '/sms/json',
        port: 443,
        method: 'POST',
        headers: {
         'Content-Type': 'application/json',
         'Content-Length': Buffer.byteLength(data)
        }
      };
      var req = https.request(options);
      req.write(data);
      req.end();

      var responseData = '';
      req.on('response', function(res){
        res.on('data', function(chunk){
         responseData += chunk;
        });
        res.on('end', function(){
         console.log(JSON.parse(responseData));
        });
      });

    }
  )
}

function updateUsers(req,res){
  console.log(req.body)
  User.findOneAndUpdate(
    {uid: req.params.id},
    req.body
    ,function(err, user){
      console.log(user)

    }
  )
}

function deleteUsers(req, res){
  console.log(req.params.id)
  User.findOneAndRemove({uid: req.params.id}, function(err) {
    console.log("delete")
  });
}


module.exports = {
  index : indexUsers,
  show : showUsers,
  getFavourite : getFavouriteUsers,
  favourite :favouriteUsers,
  create : createUsers,
  update : updateUsers,
  delete : deleteUsers
}
