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

// The POST /signup route
router.post('/', function (req, res) {
    console.log('signup post');

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
                  console.log('Problem saving the user ' + color.yellow(body.email) + ' due to ' + err);
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

});

// export the router for usage in our server/router/index.js
module.exports = router;

