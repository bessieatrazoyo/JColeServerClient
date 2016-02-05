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
console.log('req.body = ' + JSON.stringify(req.body));
  passport.authenticate ('local-login', function (err, user, info) {
console.log('passport.authenticate callback');
console.log('user = ' + JSON.stringify(user));
console.log('err = ' + err);
console.log('info = ' + info);
    if (err) {
      return next(err);
    }

    if (user) {
console.log("if user true");
      return res.json({token: user.generateJWT()});
    }
    else {
console.log("if user false");
      return res.status(401).json(info);
    }
  })(req, res, next);
});
/*
router.post('/', passport.authenticate('local-login', {
  successRedirect: '../',
  failureRedirect: '/',
  failureFlash : false
}));
/*
router.post('/', function (req, res, next) {
console.log('req.body = ' + JSON.stringify(req.body));
/*  if (!req.body.local.email || !req.body.local.password) {
console.log("didn't get past validation in router");
    return res.status(400).json({message: 'Please fill out all the fields'});
  }*/
/*  passport.authenticate('local-login', { failureRedirect: '/login' }),
  function (req, res) {
console.log('You got back from passport.authenticate');
    return res.json({token: user.generateJWT()});
  }
});
/*

   
router.post('/', passport.authenticate('local'), function(req, res) {
console.log('Got passed passport.authenticate');
console.log('user = ' + JSON.stringify(req.user));
    res.redirect('/');
});
/*
router.post('/', function (req, res, next) {
console.log('req.body = ' + JSON.stringify(req.body));
  if (!req.body.local.email || !req.body.local.password) {
console.log("didn't get past validation in router");
    return res.status(400).json({message: 'Please fill out all the fields'});
  }

console.log('before passport.authenticate');
  passport.authenticate('local', function (err, user, info) {
console.log("passport.authenticate");
    if (err) {
console.log("passport err");
      return next(err);
    }

    if (user) {
console.log("if user true");
      return res.json({token: user.generateJWT()});
    }
    else {
console.log("if user false");
      return res.status(401).json(info);
    }
  })(req, res, next);
});
*/
module.exports = router;
