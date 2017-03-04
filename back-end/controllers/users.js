var User= require("../models/User");
var bodyParser = require('body-parser');
var request = require('request');
var rP = require('request-promise');

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
  console.log(req.body)
  User.create(req.body, function(err, user){
    if (err) {
      console.log(err)
      return res.status(500).json(err)
    }
    res.status(201).json({ user: user });
  });
}

function favouriteUsers(req, res){
  console.log(req.body.term)
  User.findOneAndUpdate(
    {uid: req.body.term.uid},
    {$addToSet : {favourites: req.body.term.event}}
    ,function(err, user){
      res.status(204)
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
