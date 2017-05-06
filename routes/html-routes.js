var path = require("path");
var isLoggedIn = require("./restrict.js");

// Routes
module.exports = function(app, passport) {
    var session = require('express-session');
    app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/signup", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/profile", isLoggedIn, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/profile.html"));
    });

    app.get("/lend", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/lend.html"));
    });

    app.get("/borrow", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/borrow.html"));
    });
};