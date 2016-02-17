var csv           = require('fast-csv');
var db            = require('../server/database');

var Users = db.users;
var Utility = db.utility;
var stupid = 1;

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
}

module.exports.importFile = function (filePath, 
                                      fileHeaders, 
                                      dealerHeaders,
                                      userHeaders,
                                      contractHeaders) {
  csv
  .fromPath (filePath, {
                          delimiter         : '|',
                          headers           : fileHeaders,
                          ignoreEmpty       : true
                        })
  .on ('data', function (data) {
    console.log('you are in on');
    var user = new Users();

    console.log('data = ' + JSON.stringify(data));

    /*
    for (var i = 0; i < userHeaders.length; i++) {
      var h = userHeaders[i];
      console.log('value = ' + h);
      user[h] = data[h];
    }
    */
    if (!validateEmail(data['contract_email'])) {
//      var count = Utility.nextEmailCounter();
      stupid++
      data['contract_email'] = 'email ' + stupid + '@fakemail.com';
console.log('fake email made:  ' + data['contract_email']);
    }
      
/*
    for (var prop in userHeaders) {
console.log('prop = ' + prop);
console.log('userHeaders[prop] = ' + userHeaders[prop]);
      user[prop] = userHeaders[prop];
    }
*/
    user.first_name = data['user_first_name'];
    user.last_name  = data['user_last_name'];
    user.address_1  = data['user_address_1'];
    user.address_2  = data['user_address_2'];
    user.city       = data['user_city'];
    user.state      = data['user_state'];
    user.zip_code   = data['user_zip'];
    user.local.email = data['contract_email'];
    
    console.log('user = ' + JSON.stringify(user));

    user.save (function (err) {
      if (err) {
        console.log (err);
      }

    return;
  });
  });
};
