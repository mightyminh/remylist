var path = require("path");
var isLoggedIn = require("./restrict.js");

// Routes
module.exports = function(app, passport) {
    app.get("/lend", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/lend.html"));
    });

    app.get("/borrow", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/borrow.html"));
    });
};