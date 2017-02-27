var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  first_name : {type: String, required:true},
  last_name : {type: String, required:true},
  email : {type: String, required:true},
  mobile_number : {type: Number, required:true},
  post_code : {type: String, required:true},
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Events" }]//double check the shoe in this line
  //maybe have wallet
});
//module.exports = mongoose.model('User' , UserSchema);

