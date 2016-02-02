var express = require('express');
var router = express.Router();
var passport = require('passport');
var db = require('../../database');
var Users = db.users;
var jwt = require('express-jwt');
var auth = jwt({
              secret        : 'SECRET',
              userProperty  : 'payload'
            });

router.post('/', function (req, res, next) {
  if (!req.body.email || req.body.password) {
    return res.status(400).json({message: 'Please fill out all the fields'});
  }

  passport.authenticate('local', function (err, user, info) {
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

module.exports = router;
