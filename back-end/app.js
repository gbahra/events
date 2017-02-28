var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var router = require('./config/routes');
var ejs = require('ejs')
// var layouts = require('express-ejs-layouts');
var bodyParser = require('body-parser')
var morgan = require('morgan')

console.log( 'api key ' + process.env.TOKENVARNAME)

mongoose.connect('mongodb://localhost/event', function() {
  console.log('database connected.')
})
app.set('view engine' , 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'))
  // parse application/json
app.use(bodyParser.json());

app.use(router);
app.get('/', function indexEvents(req,res){
  res.render('../views/layout')
})


app.listen(port, function() {
  console.log("The server is on and listening on port " + port);
})
module.exports = app;
