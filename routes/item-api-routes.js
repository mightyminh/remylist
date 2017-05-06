var db = require("../models");

var itemId = 1;
var userDataId = 1;

// Routes
// =============================================================
module.exports = function(app) {

    // Signed-in user can add a new item to lend
    app.post("/api/lend", function(req, res) {
        db.Item.create({
            name: "sewing machine",
            category: "Homegoods",
            description: "simple sewing machine",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/6183wgXfS5L._SL1500_.jpg",
            UserId: 1
        }).then(function(dbItem) {
            res.json(dbItem);
        });
    });

    // Lender updating the status of an item to unavailable
    app.put("/api/unavailable", function(req, res) {
        db.Item.update({
            available: false
        }, {
            where: {
                id: itemId
            }
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    // Lender updating the status of an item to available 
    app.put("/api/available", function(req, res) {
        db.Item.update({
            available: true
        }, {
            where: {
                id: itemId
            }
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    // Lender can delete an item from the database
    app.delete("/api/delete", function(req, res) {
        db.Item.destroy({
            where: {
                id: itemId
            }
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });
};