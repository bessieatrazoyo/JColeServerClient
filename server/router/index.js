/**
 * The Index of Routes
 */

module.exports = function (app) {

    app.use('/signup', require('./routes/signup'));
    app.use('/register', require('./routes/register'));
    app.use('/login', require('./routes/login'));
};
