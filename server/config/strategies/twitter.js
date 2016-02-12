var passport = require('passport');
var TwitterStrategy  = require('passport-twitter').Strategy;
var db            = require('../../database');
var Users         = db.users;
var configAuth    = require('../auth');

module.exports = function() {

    passport.use(new TwitterStrategy({

        consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, tokenSecret, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                Users.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.twitter.token) {
                            user.twitter.token       = token;
                            user.twitter.username    = profile.username;
                            user.twitter.displayName = profile.displayName;

                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                    
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser                 = new Users();

                        newUser.twitter.id          = profile.id;
                        newUser.twitter.token       = token;
                        newUser.twitter.username    = profile.username;
                        newUser.twitter.displayName = profile.displayName;

                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                                
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user                 = req.user; // pull the user out of the session

                user.twitter.id          = profile.id;
                user.twitter.token       = token;
                user.twitter.username    = profile.username;
                user.twitter.displayName = profile.displayName;

                user.save(function(err) {
                    if (err)
                        return done(err);
                        
                    return done(null, user);
                });
            }

        });

    }));
    /*
  passport.use(new TwitterStrategy({
    consumerKey       : configAuth.twitterAuth.consumerKey,
    consumerSecret    : configAuth.twitterAuth.consumerSecret,
    callbackURL       : configAuth.twitterAuth.callbackURL,
    passReqToCallback : true
  },

  function (req, token, tokenSecret, user, done) {
    console.log("twitter function");
    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter
    process.nextTick(function() {
      console.log("nextTick");

      Users.findOne({ 'twitter.id' : profile.id }, function(err, user) {
        console.log("findOne");

          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err) {
            return done(err);
          }

          // if the user is found then log them in
          if (user) {
              console.log("found a user");
              return done(null, user); // user found, return that user
          } else {
            console.log("didn't find user, create one");
              // if there is no user, create them
              var newUser                 = new User();

              // set all of the user data that we need
              newUser.twitter.id          = profile.id;
              newUser.twitter.token       = token;
              newUser.twitter.username    = profile.username;
              newUser.twitter.displayName = profile.displayName;

              // save our user into the database
              newUser.save(function(err) {
                  if (err)
                      throw err;
                  return done(null, newUser);
              });
          }
      });//end findOne
    });//end nextTick
  }//end anonymous function
  )//Twitter strategy
  );//passport.use
  */
};//export
