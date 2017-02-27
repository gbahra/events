var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var router = require('./config/routes');
var layouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
// var flash = require('connect-flash');

app.listen(port, function() {
  console.log("The server is on and listening on port " + port);
})
console.log( 'api key ' + process.env.TOKENVARNAME)

mongoose.connect('mongodb://localhost/shoes', function() {
  console.log('database connected.')
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// method override
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    console.log(method)
    return method
  }
}));

app.set('view engine' , 'ejs');
app.use(express.static('public'));

app.use(layouts);


app.use(router);

module.exports = app;
