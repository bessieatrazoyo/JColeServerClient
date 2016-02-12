var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var Users = require('mongoose').model('User');
var db            = require('../../database');
var Users         = db.users;

module.exports = function() {
  passport.use('local-login', new LocalStrategy ({
    // by default, local strategy uses username and password.  Here we override these field names
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
    },
    function (req, email, password, done) {
      if (email) {
        email = email.toLowerCase();
      }

      Users.findOne ({'local.email': email}, function (err, user) {
        if (err) {
          return done (null, false, { message: "Error finding user" });
        }

        if (!user) {
          return done (null, false, { message: 'User email not found' });
        }

        if (!user.validPassword (password)) {
          return done (null, false, { message: 'Incorrect password' });
        }

        return done (null, user);
      });//Users.findOne
    })//end of new LocalStategy
  );//end of passport.use
};//module exports
