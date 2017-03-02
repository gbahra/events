var User= require("../models/User");
var bodyParser = require('body-parser');
var request = require('request');

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

function getfavouriteUsers(req, res){
  var resObj = [];
  User.findOne({uid:req.params.id} , function(err, user) {
    if(!user) return res.status(404).send("Not found");
    if(err) return res.status(500).send(err);
    for(var i = 0; i<user.favourites.length; i++){
      request('http://www.skiddle.com/api/v1/events/search/?api_key=' + process.env.TOKENVARNAME + '&keyword='+ user.favourites[i],
        function (error, response, body) {
          if (error) {console.log(error)}
          response.body = JSON.parse(JSON.stringify(response.body))
          //console.log(response.body)
          resObj[i] = response.body;
          //console.log(resObj[i])
        }
      )
    }
    console.log(resObj)
    res.status(200).json(resObj);
  });

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
      res.status(204);
    }
    )
}



function deleteUsers(req, res){
  User.findByIdAndRemove(req.params.id , function(err) {
    res.status(200).redirect('/')
    console.log("delete")
  });
}


module.exports = {
  index : indexUsers,
  show : showUsers,
  getFavourite : getfavouriteUsers,
  favourite :favouriteUsers,
  create : createUsers,
  update : updateUsers,
  delete : deleteUsers
}
