var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var router = require('./config/routes');
var ejs = require('express-ejs-layouts')
var layouts = require('express-ejs-layouts');

// var flash = require('connect-flash');

app.listen(port, function() {
  console.log("The server is on and listening on port " + port);
})
console.log( 'api key ' + process.env.TOKENVARNAME)

mongoose.connect('mongodb://localhost/shoes', function() {
  console.log('database connected.')
})

app.set('view engine' , 'ejs');
app.use(express.static('public'));
app.use(layouts);
app.use(router);
module.exports = app;
