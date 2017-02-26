var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var expect = require('chai').expect;
var User = require('../models/User');
var mongoose = require('mongoose');
// CHANGES REGEXES BASED ON WHATS ACTUALLY GONNA BE ON THE PAGE
chai.use(chaiHttp);

describe('Users', function() {
  var user = new User({
    first_name : "gurpal",
    last_name : "bahra",
    email : "g@b.com",
    mobile_number: 07123456789,
    postcode: 'ab1 2cd'
  });

  beforeEach(function(done) {
    user.save(function(err, newUser) {
      if (err) return console.log(err);
      console.log("made newUser with id " + newUser.id);
      user.id = newUser.id;
      done();
    })
  })

  afterEach(function(done) {
    User.findByIdAndRemove(user.id, function(err) {
      if (err) return console.log(err);
      done();
    })
  })
  //show
  it('should list a SINGLE user on /<id> GET', function(done) {
    chai.request(app)
      .get('/' + user.id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        res.text.should.match(/user details/);
        res.text.should.match(/mobile no./);
        done();
      });
  });
  // create
  it('should add a SINGLE user on / POST' , function(done){
    var request = chai.request(app);
    request.post('/user')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        first_name : "GURPAL",
        last_name : "BAHRA",
        email : "G@B.com",
        mobile_number: 07123456789,
        postcode: 'AB1 2CD'
      })
      .end(function(err, res){
        if(err) console.log(err)
        res.should.have.status(200);
        res.should.be.html;
        res.text.should.match(/Events);
        request
          .get('/')
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.html;
            res.text.should.match(/events/);
            done();
            });
          });
      });


  // updating user details
  it('should update a SINGLE user on /<id> PUT' , function(done){
    var request = chai.request(app);
    request.put('/'+ user._id)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({'mobile_number': '12214221211'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        res.text.should.match(/All users/);
        request
          .get('/')
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.html;
            res.text.should.match(/blue/);
            done();
          });
      });
  });

 //delete
  it('should delete a SINGLE user on /<id>   DELETE' , function(done) {
    var request = chai.request(app);
    request.delete('/' + user.id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        res.text.should.match(/All users/);
        request
          .get('/'+ user.id)
          .end(function(err, res){
            res.should.have.status(404);
            done();
          });
      });
    });
  };
