var express = require('express');
var passport = require('passport');
var router = express.Router();
var db = require('../../database');
var Users = db.users;

/*
router.post('/', function (req, res, next) {
console.log('req.body = ' + JSON.stringify(req.body));
Users.register(new Users (
  { username : req.body.local.email,
    email : req.body.local.email }), req.body.password1, function(err, newUser) {
        if (err) {
console.log('after Users.register -- an error');
console.log('err = ' + err);
            return next(err);
        }
console.log('newUser = ' + JSON.stringify(newUser));

//        passport.authenticate('local')(req, res, function () {
console.log('passport.authenticate afterwards');
            return res.json({token: newUser.generateJWT()});
//        });
    });
*/

router.post('/', function (req, res, next) {
  console.log('req.body = ' + JSON.stringify(req.body));

  if (!req.body.local.email || !req.body.password1) {
    return res.status(400).json({message:'Please fill out email and password fields'});
  }

console.log("before new user");
  var newUser = new Users({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      local: {
        email: req.body.local.email
      }
  });

console.log('before setPassword');
console.log('newUser: ' + JSON.stringify(newUser));
  newUser.setPassword(req.body.password1);
console.log('newUser before save:  ' + JSON.stringify(newUser));

  newUser.save(function (err) {
    if (err) {
console.log('after newUser.save -- an error');
console.log('err = ' + err);
      return next(err);
    }

    return res.json({token: newUser.generateJWT()});
  });
});

module.exports = router;

