var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');
var async = require('async');

var db            = require('../server/database');
var Users         = db.users;

var csvHeaders = {
  DEALERS: {
    headers: [
      'code',
      'name',
      'address_1',
      'city',
      'state',
      'zip',
      '1'
    ]},
  USERS: {
    headers: [
      '90005738',
      'after_90005738',
      'last_name',
      'first_name',
      'address_1',
      'address_2',
      'city',
      'state',
      'zip'
    ]},
  CONTRACTS: {
    headers: [
      'after_user_zip',
      '08ZAKEQ',
      'ULTWINT',
      'coverage_option_i_think',
      'coverage_months',
      'beginning_mileage',
      'coverage_miles',
      '.00',
      'vehicle_year',
      'vin',
      '29',
      'make',
      'model',
      'model_code',
      'date_1',
      'date_2',
      'date_3',
      'date_4',
      'expired',
      'not_sure',
      '600.00',
      '203.00'
    ]}
}
var csvAllHeaders = csvHeaders.DEALERS.headers.
                     concat(csvHeaders.DEALERS.headers).
                     concat(csvHeaders.CONTRACTS.headers);
       
var inputFile='ZakContracts.txt';

function doSomething (line, callback) {
  console.log('line = ' + line);
  callback();
}

var transformer = transform (function (data) {
  var user = new Users();

  Object.keys(data).

var parser = parse({delimiter: '|'}, function (err, data) {
  async.eachSeries(data, function (line, callback) {
    // do something with the line
    doSomething(line, function (err, data) {
      // when processing finishes invoke the callback to move to the next one
      callback();
    });
  });
});

fs.createReadStream(inputFile).pipe(parser);
/* This works.  I'm saving it so I can mess it up
var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');

var inputFile='ZakContracts.txt';

function doSomething (line, callback) {
  console.log('line = ' + line);
  callback();
}

var parser = parse({delimiter: '|'}, function (err, data) {
  async.eachSeries(data, function (line, callback) {
    // do something with the line
    doSomething(line, function (err, data) {
      // when processing finishes invoke the callback to move to the next one
      callback();
    });
  });
});

fs.createReadStream(inputFile).pipe(parser);
*/
/* This one works, but it's slow
var fs            = require('fs');
var csvParser = require('csv-parse');

fs.readFile('ZakContracts.txt', {
            encoding: 'utf-8'
        }, function(err, csvData) {
            if (err) {
                console.log(err);
            }
  
            csvParser(csvData, {
                delimiter: '|' 
            }, function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        });

var parse = require('csv-parse');

var output = [];
// Create the parser
var parser = parse({delimiter: ':'});
// Use the writable stream api
parser.on('readable', function(){
  while(record = parser.read()){
    output.push(record);
  }
});
// Catch any error
parser.on('error', function(err){
  console.log(err.message);
});
// When we are done, test that the parsed output matched what expected
parser.on('finish', function(){
  console.log('done');
});
// Now that setup is done, write data to the stream
parser.write("root:x:0:0:root:/root:/bin/bash\n");
parser.write("someone:x:1022:1022:a funny cat:/home/someone:/bin/bash\n");
// Close the readable stream
parser.end();
*/
/*  This one works, but it's slow 
var fs            = require('fs');
var parse         = require('csv-parse');

var csv_options   = {
  "delimiter": '|'
};

var parser = parse (csv_options, function (err, data) {
  console.log (data);
});

fs.createReadStream ('ZakContracts.txt').pipe(parser);
*/
/*
var stream        = fs.createReadStream('ZakContracts.txt');

var csvStream = csv (stream, csv_options)
  .on ('data', function (data) {
    console.log(data);
  })
  .on ('end', function () {
    console.log ('done');
  });

stream.pipe (csvStream);

var csvStream = csv()
  .on ('data', csv_options, function (data) {
    console.log (data);
  })
  .on ('end', csv_options, function () {
    console.log ('done');
  });

stream.pipe(csvStream);
var db            = require('../server/database');
var Users         = db.users;
var async = require('async');

var csv = []; // build the csv into an array...
// putting the data into the 'test' database:
MongoClient.connect('mongodb://127.0.0.1:27017/test',
  function(err, db) {
    if (err) {
      throw err;
    }

    // collections:
    //    users
    //    contracts
    //    dealers

    async.every(csv, function(row, callback) {
       // build the csv row into an object literal
       console.log("csv = " + csv);
/*
       var data = { "name" : .... }; // make this fit your data correctly
       collection.insert(data, function(err, docs) {
          // signal that this row is done inserting
          // by calling the callback passed with every row
          callback(err);
       });
    }, function() {
        // all rows have been inserted, so close the db connection
        db.close();
    });
});
*/
