/**
 * The Index of Routes
 */
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

module.exports = function (app) {

    // The signup route
    app.use('/signup', require('./routes/signup'));
    app.use('/register', require('./routes/register'));
    app.use('/login', require('./routes/login'));
}
