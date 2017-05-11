'use strict';

//Model and authentication check.
var db = require("../models");
var isLoggedIn = require("./restrict.js");
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'remylists@gmail.com',
        pass: 'remylists000'
    }
});

module.exports = function(app, passport) {

    // Passport local strategies for sign-in and sign-up.
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
                return done(null, false, req.flash('userMessage', 'Incorrect username'));
            } else if (password != user.password) {
                return done(null, false, req.flash('userMessage', 'Incorrect password'));
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
                        return done(null, false, req.flash('newUserMessage', 'Sign-up error'));
                    } else {
                        return done(null, newUser);
                    }
                });
            } else {
                return done(null, false, req.flash('newUserMessage', 'Username already exist'));
            }
        });
    }));

    // User signing in
    app.post('/login', passport.authenticate('local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true
    }));

    // New user signup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // Login page
    app.get("/", function(req, res) {
        res.render("home", { loginMessage: req.flash('userMessage') });
    });

    //Sign-up page
    app.get("/signup", function(req, res) {
        res.render("signup", { signupMessage: req.flash('newUserMessage') });
    });

    // Logged-in user personal info
    app.get("/profile", isLoggedIn, function(req, res) {
        var userDataId = req.user.id;
        db.User.findAll({
            where: {
                id: userDataId
            }
        }).then(function(dbGet) {
            var userObject = {
                data: dbGet
            };
            res.render("profile", userObject);
        });
    });

    // Logged-in user can update their personal info
    app.put("/update-user", isLoggedIn, function(req, res) {
        var userDataId = req.user.id;
        db.User.update({
            fullName: req.body.updateFullName,
            email: req.body.updateEmailId,
            location: req.body.updateLocation
        }, {
            where: { id: userDataId }
        });
    });

    // Request email
    app.post('/send-mail', function(req, res) {
        var userDataId = req.user.id;
        db.User.findAll({
            where: {
                id: userDataId
            }
        }).then(function(dbUser) {
            var fromMail = dbUser[0].dataValues.email;
            if (isNaN(req.body.itemId)) {
                console.log("Mail NOT sent");
            } else {
                db.Item.findAll({
                    where: {
                        id: parseInt(req.body.itemId)
                    },
                    include: [{
                        model: db.User,
                        as: "Lender"
                    }]
                }).then(function(dbLender) {
                    var toMail = dbLender[0].dataValues.Lender.dataValues.email;
                    var borrowSubject = "Remys list: Borrow " + dbLender[0].dataValues.name +
                        " for " + req.body.numDays + " days";
                    let mailOptions = {
                        from: fromMail,
                        to: toMail,
                        subject: borrowSubject,
                        text: req.body.mailMessage
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    });
                    res.render("allItems");
                });
            }
        });
    });
};