var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
              secret        : 'SECRET',
              userProperty  : 'payload'
            });

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

module.exports = router;
