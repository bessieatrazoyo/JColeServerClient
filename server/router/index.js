/**
 * The Index of Routes
 */

module.exports = function (app) {

    // The signup route
    app.use('/signup', require('./routes/signup'));
    app.use('/profile', require('./routes/profile'));
}
