// If the user not logged-in redirect to login page.

module.exports = function(req, res, next) {
    var passport = require('passport');
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}