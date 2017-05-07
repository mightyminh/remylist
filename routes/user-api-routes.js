var db = require("../models");
var isLoggedIn = require("./restrict.js");

module.exports = function(app, passport) {

    // Passport local strategies.
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        db.User.findById(id).then(function(user) {
            if (!user) { return done(null, false); }
            done(null, user);
        });
    });

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        db.User.findOne({
            where: { userName: username }
        }).then(function(user) {
            if (!user) {
                return done(null, false);
            } else if (password != user.password) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        });
    }));

    passport.use('local-signup', new LocalStrategy({
        passReqToCallback: true
    }, function(req, username, password, done) {
        db.User.findOne({
            where: {
                userName: username
            }
        }).then(function(user) {
            if (!user) {
                db.User.create({
                    userName: username,
                    password: password,
                    fullName: req.body.fullname,
                    email: req.body.email,
                    location: req.body.locations
                }).then(function(newUser) {
                    if (!newUser) {
                        return done(null, false);
                    } else {
                        return done(null, newUser);
                    }
                });
            } else {
                console.log("user exist");
                return done(null, false);
            }
        });
    }));

    app.post('/login', passport.authenticate('local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup'
    }));

    app.get('/api/profile', isLoggedIn, function(req, res, next) {
        var userDataId = req.user.dataValues.id;
        db.User.findAll({
            where: {
                id: userDataId
            }
        }).then(function(dbGet) {
            res.json(dbGet);
        });
    });

    // Logged-in user lend items
    app.get("/api/lend", isLoggedIn, function(req, res) {
        var userDataId = req.user.dataValues.id;
        db.Item.findAll({
            where: {
                lender_id: userDataId
            },
            include: [{
                model: db.User,
                as: 'Lender'
            }]
        }).then(function(dbGet) {
            res.json(dbGet);
        });
    });
};