// If the user not logged-in redirect to login page.
module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}