var db = require('../database');
var Users = db.users;

module.exports = function (passport) {
  passport.serializeUser (function (user, done) {
    done (null, user.id);
  });

  passport.deserializeUser (function (id, done) {
    Users.findById (id, function (err, user) {
      done (err, user);
    });
  });

  require('./strategies/local.js')();
  require('./strategies/facebook.js')();
  require('./strategies/twitter.js')();
};  
