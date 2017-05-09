var db = require("../models");
var isLoggedIn = require("./restrict.js");

var itemId = 1;
var userDataId = 1;
var itemCat = "jewelery";
var location = "san diego"

// Routes
// =============================================================
module.exports = function(app) {

    // CREATE
    // Signed-in user can add a new item to lend
    app.post("/lend", function(req, res) {
        db.Item.create({
            name: "sewing machine",
            category: "Homegoods",
            description: "simple sewing machine",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/6183wgXfS5L._SL1500_.jpg",
            UserId: 1
        }).then(function(dbItem) {
            res.json(dbItem);
            res.render("");
        });
    });

    // RETRIEVE 
    // Select all items in database
    app.get("/allItems", function(req, res) {
        db.Item.findAll({})
            .then(function(dbItem) {
                res.json(dbItem);
                res.render("");
            });
    });

    // Select all items from chosen category
    app.get("/itemsByCategory", function(req, res) {
        db.Item.findAll({
            where: {
                category: itemCat
            }
        }).then(function(dbItem) {
            res.json(dbItem);
            res.render("");
        });
    });

    // Select all items from a chosen location
    app.get("/itemsByLocation", function(req, res) {
        db.User.findAll({
            where: {
                location: location
            },
            include: [{
                model: db.Item,
                as: "Lending"
            }]
        }).then(function(dbItem) {
            res.json(dbItem);
            res.render("");
        });
    });

    // Get all items lent by user
    app.get("/itemsByLender", function(req, res) {
        db.Item.findAll({
            where: {
                lender_id: userDataId
            }
        }).then(function(dbItem) {
            res.json(dbItem);
            // res.render("");
        });
    });

    // Get all items borrowed by user
    app.get("itemsByBorrower", function(req, res) {
        db.Item.findAll({
            where: {
                borrower_id: 2
            }
        }).then(function(dbItem) {
            res.json(dbItem);
        });
    });

    // UPDATE
    // Lender update the status of an item to unavailable
    app.put("/itemUnavailable", function(req, res) {
        db.Item.update({
            available: false
        }, {
            where: {
                id: itemId
            }
        }).then(function(dbPost) {
            res.json(dbPost);
            res.render("lend-items");
        });
    });

    // Lender update the status of an item to available 
    app.put("/itemAvailable", function(req, res) {
        db.Item.update({
            available: true
        }, {
            where: {
                id: itemId
            }
        }).then(function(dbPost) {
            res.json(dbPost);
            res.render("lend-items");
        });
    });

    // Lender update the information from an item already posted
    app.put("/updateItem", function(req, res) {
        db.Item.update({
            name: "Sewing Machine",
            category: "Homegoods",
            description: "Bernina sewing machine",
            imageURL: "google.com"
        }, {
            where: {
                id: itemId
            }
        }).then(function(dbPost) {
            res.json(dbPost);
            res.render("lend-items");
        });
    });

    // DELETE
    // Lender can delete an item from the database
    app.delete("/deleteItem", function(req, res) {
        db.Item.destroy({
            where: {
                id: itemId
            }
        }).then(function(dbPost) {
            res.json(dbPost);
            res.render("lend");
        });
    });
};