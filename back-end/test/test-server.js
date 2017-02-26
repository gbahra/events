var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var expect = require('chai').expect;
var Event = require('../models/Event');
var mongoose = require('mongoose');

chai.use(chaiHttp);

  it('should list a SINGLE event on /<id> GET', function(done) {
    chai.request(app)
      .get('/' + event.id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        // res.text.should.match(/All shoes/);
        // res.text.should.match(/testShoe/);
        //here add test event where you know whats coming
        done();
      });
  });

  it('should list ALL shoes on / GET', function(done) {
    var request = chai.request(app);
    request
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;
        // res.text.should.match(/All shoes/);
        // res.text.should.match(/Air Jordan 1 Bred/);
        //here add test event where you know whats coming
        done();
      });
  });


