var User= require("../models/User");
var bodyParser = require('body-parser');

function indexUsers(req, res){
  User.find({} , function(err, users) {
    if(err) return res.status(500).json(err);
    res.status(200).json({
      users: users
    });
  });
}

function showUsers(req, res){
  User.findById(req.params.id , function(err, user) {
    if(!user) return res.status(404).send("Not found");
    if(err) return res.status(500).send(err);
    res.status(200).json({
      user: user
    });
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

function updateUsers(req, res){
  console.log(req.body.term)
  User.findOneAndUpdate(
    {uid: req.body.term.uid},
    {$addToSet : {favourites: req.body.term.event}}
    ,function(err, user){
      res.status(204)
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
  create : createUsers,
  update : updateUsers,
  delete : deleteUsers
}
