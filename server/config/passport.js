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
