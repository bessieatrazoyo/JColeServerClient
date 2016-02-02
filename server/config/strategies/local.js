var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function() {
  passport.use(new LocalStrategy(function(email, password, done) {
console.log("email = " + email);
console.log("password = " + password);
    User.findOne(
      { "local.email":email },
      function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false,
            { message: 'Unknown user' });
        }

        if (!user.validPassword(password)) {
          return done(null, false, {message: 'Invalid password'});
        }

        return done(null, user);
      }
    );
  }));
};

      
