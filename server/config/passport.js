var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
/*var db = require('../database');
var Users = db.users;
*/
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use (new LocalStrategy (
  function (email, password, done) {
console.log("passport use");
    Users.findOne ({'local.email':email}, function (err, user) {
console.log("passport findOne");
      if (err) {
console.log("error in passport");
        return done (err);
      }
      if (!user) {
        return done (null, false, { message: 'User email not found' });
      }
      if (!user.validPassword (password)) {
        return done (null, false, { message: 'Incorrect password' });
      }
      return done (null, user);
    });
  }
));
/*
var passport = require('passport');
var db = require('../database');
var Users = db.users;

module.exports = function() {

  passport.serializeUser (function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser (function (id,done) {
    Users.findById (id, function (err, user) {
        done(err, user);
      }
    );
  });

  require('./strategies/local.js')();
};
*/
