var db = require("../models");
var userDataId = 1;

module.exports = function(app) {

    // Logged-in user details
    app.get("/api/profile", function(req, res) {
        db.User.findAll({
            where: {
                id: userDataId
            }
        }).then(function(dbGet) {
            res.json(dbGet);
        });
    });

    // Sign-up new user
    app.post("/api/signup", function(req, res) {
        db.User.create({
            userName: "radhika",
            password: "radhika",
            fullName: "radhika s",
            email: "radhika @gmail.com",
            location: "escondido"
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    // Logged-in user lend items
    app.get("/api/lend", function(req, res) {
        db.Item.findAll({
            where: {
                UserId: userDataId
            },
            include: [db.User]
        }).then(function(dbGet) {
            res.json(dbGet);
        });
    });
};