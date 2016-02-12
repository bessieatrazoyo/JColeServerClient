/**
 * The Index of Routes
 */
var db                = require('../database');
var Users             = db.users;

module.exports = function (app, passport) {
  var jwt = require('express-jwt');
  var auth = jwt({
                secret        : 'SECRET',
                userProperty  : 'payload'
              });

  app.post('/login', 
                       
  function (req, res, next) {
    passport.authenticate ('local-login', function (err, user, info) {
      if (err) {
        return next(err);
      }

      if (user) {
        return res.json({token: user.generateJWT()});
      }
      else {
        return res.status(401).json(info);
      }
    })(req, res, next);
  });

  /*
  app.get('/auth/twitter',

  function (req, res, next) {
    console.log('app.get(/auth/twitter)');
    Users.findOne({'first_name':'Bessie'}, function (err, user) {
        if (err) {
          return done (null, false, { message: "Error finding user" });
        }

        if (!user) {
          return done (null, false, { message: 'User email not found' });
        }
        else {
          return res.json({token: user.generateJWT()});
        }
      });//Users.findOne
  });
  */
  
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
      function (req, res) {
console.log('/auth/facebook/callback');
console.log("req.user = " + JSON.stringify(req.user));
/*
      if (req.user) {
        return res.json({token: req.user.generateFacebookJWT()});
      }
      else {
        return res.status(401).json(info);
      }
      */
        res.redirect('/');
      }
  );


  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', 
    passport.authenticate ('twitter', {
      successRedirect : '/',
      failureRedirect : '/login.html'
    })
  ); 

    app.use('/signup', require('./routes/signup'));
    app.use('/register', require('./routes/register'));
    //    app.use('/login', require('./routes/login'));
};
