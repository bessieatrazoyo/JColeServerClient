var express = require('express');
var router = express.Router();
var db = require('../../database');
var Users = db.users;

router.post('/', function (req, res, next) {
  console.log('post /register body: ' +req.body);

  if (!req.body.email || !req.body.password1) {
    return res.status(400).json({message:'Please fill out email and password fields'});
  }

  var newUser = new Users({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      local: {
        email: req.body.email,
        password: req.body.password1
      }
  });

  newUser.save(function (err) {
    if (err) {
      return next(err);
    }

    return res.json({token: newUser.generateJWT()});
  });
});

module.exports = router;

