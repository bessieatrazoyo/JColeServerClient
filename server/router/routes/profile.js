var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  console.log(req.body);

  res.json({
    'msg': 'How do I return a user?'
  });
});

module.exports = router;

