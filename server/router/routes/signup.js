/**
 * This handles the signing up of users
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
//var ObjectID = require('mongodb').ObjectID;
var Users = db.users;
var passport = require('passport');

var getErrorMessage = function(err) {
  var message = '';
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        messsage = 'Something went wrong';
    }
  }
  else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }
  }

  return message;
};


// The POST /signup route
router.post('/', function (req, res) {
/*    console.log('signup post');

    // The posted information from the front-end
    var body = req.body;
    // Current time this occurred
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    var message = null;

    // Check to see if the user already exists
    // using their email address
    Users.findOne({

        'local.email': body.email

    }, function (err, user) {

        console.log('findOne user');
        // If there's an error, log it and return to user
        if (err) {
            var message = getErrorMessage(err);

            // Nice log message on your end, so that you can see what happened
            console.log('Couldn\'t create new user at ' + color.red(time) + ' by ' + color.red(body.email) + ' because of: ' + message);

            // send the error
            res.status(500).json({
                'message': message });
        }

        // If the user doesn't exist, create one
        if (!user) {
            console.log('Creating a new user at ' + color.green(time) + ' with the email: ' + color.green(body.email));

            // setup the new user
            //            var generatedId = ObjectID(body.email);
            var newUser = new Users({
                //_id: generatedId,
                first_name: body.first_name,
                last_name: body.last_name,
                local: {
                  email: body.email,
                  password: body.password1
                }
            });

            console.log(JSON.stringify(newUser));

            // save the user to the database
            newUser.save(function (err, savedUser, numberAffected) {

                if (err) {
                  var message = getErrorMessage(err);
                    console.log('Problem saving the user ' + color.yellow(body.email) + ' due to ' + message);
                    res.status(500).json({
                        'message': message });
                }

                // Log success and send the filtered user back
                console.log('Successfully created new user: ' + color.green(body.email));

                res.status(201).json({
                    'message': 'Successfully created new user',
                    'client': _.omit(savedUser, 'password')
                });

            });
        }

        // If the user already exists...
        if (user) {
            res.status(409).json({
                'message': body.email + ' already exists!'
            });
        }

    });
*/
});

var endpoint = {
  renderLogin : function(req, res, next) {
    if (!req.user)  {
      res.render('login', {
        title: 'Log-in Form',
        messages: req.flash('error') || req.flash('info')
      });
    }
    else {
      return res.redirect('/');
    }
  },
  renderRegister : function(req, res, next) {
    if (!req.user) {
      res.render('register', {
        title: 'Register Form',
        messages: req.flash('error')
      });
    }
    else {
      return res.redirect('/');
    }
  },
  register : function(req, res, next) {
    if (!req.user) {
      // Does the user exist?
      Users.findOne( { 'local.email' : body.email }, function (err, user) {
        if (err) {
          var message = getErrorMessage(err);
          console.log('findOne error: ' + color.red(message) + color.red(body.email));
          res.status(500).json({'message':message});
        } // end if(err)
        if (!user) {
          var newUser = new Users({
              first_name: body.first_name,
              last_name: body.last_name,
              provider: 'local', // this isn't in the schema.  It's in MongoCRUD.
              local: {
                email: body.email,
                password: body.password1
              }
          });//end newUser
          newUser.save(function (err, savedUser, numberAffected) {
            if (err) {
              var message = getErrorMessage(err);
              res.status(500).json({'message':message});
              return res.redirect('/');
            }// end if(err)

            req.login(newUser, function(err){
              if (err) {
                return next(err);
              }
              console.log(color.green('Yay! ' + newUser.local.email + ' logged in')); 
              return res.redirect('/');
            });//end req.login
          });//end newUser.save 
        }//end if (!user)
      });// end findOne
    } // endif !req.user
    else {
      return res.redirect('/');
    } // end else
/*    if (!req.user) {

      // The posted information from the front-end
      var body = req.body;
      // Current time this occurred
      var time = moment().format('MMMM Do YYYY, h:mm:ss a');
      var message = null;

      // Check to see if the user already exists
      // using their email address
      Users.findOne({
        'local.email': body.email
      }, function (err, user) {

          console.log('findOne user');
          // If there's an error, log it and return to user
          if (err) {
              var message = getErrorMessage(err);

              // Nice log message on your end, so that you can see what happened
              console.log('Couldn\'t create new user at ' + color.red(time) + ' by ' + color.red(body.email) + ' because of: ' + message);

              // send the error
              res.status(500).json({
                  'message': message });
          }

          // If the user doesn't exist, create one
          if (!user) {
              console.log('Creating a new user at ' + color.green(time) + ' with the email: ' + color.green(body.email));

              // setup the new user
              //            var generatedId = ObjectID(body.email);
              var newUser = new Users({
                  //_id: generatedId,
                  first_name: body.first_name,
                  last_name: body.last_name,
                  provider: 'local', // this isn't in the schema.  It's in MongoCRUD.
                  local: {
                    email: body.email,
                    password: body.password1
                  }
              });

              console.log(JSON.stringify(newUser));

              // save the user to the database
              newUser.save(function (err, savedUser, numberAffected) {

                  if (err) {
                    var message = getErrorMessage(err);
                      console.log('Problem saving the user ' + color.yellow(body.email) + ' due to ' + message);
//                    res.status(500).json({
//                          'message': message });
//this was in JCole                         
                    return res.redirect('/');
                  }

                  console.log('Successfully created new user: ' + color.green(body.email));
                  req.login(newUser, function(err) {
                    if (err) {
                      var message = getErrorMessage(err);
                      console.log('Problem logging in user: ' + color.red(message));
                      return next(err);
                    }

                    console.log('Successfully logged in new user: ' + color.green(body.email));
                    return res.redirect('/');
                  });
              }); // newUser.save 
            } // if (!user) 
          }
          else {
            // If the user already exists...
            res.status(409).json({
                'message': body.email + ' already exists!'
            });
          }
      });
    }
    else {
      return res.redirect('/');
    }*/

  },
  logout : function(req, res) {
    req.logout();
    res.redirect('/');
  }
};

// export the router for usage in our server/router/index.js
module.exports = router;

