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
    app.post("/add-item", function(req, res) {
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
    app.get("/all-items", function(req, res) {
        db.Item.findAll({})
            .then(function(dbItem) {
                var itemsObject = {
                    items: dbItem
                };
                res.json(dbItem);
                res.render("borrow", itemsObject);
            });
    });

    // Select all items from chosen category
    app.get("/items-by-category", function(req, res) {
        db.Item.findAll({
            where: {
                category: itemCat
            }
        }).then(function(dbItem) {
            var itemsObject = {
                items: dbItem
            };
            res.json(dbItem);
            res.render("", itemsObject);
        });
    });

    // Select all items from a chosen location
    app.get("/items-by-location", function(req, res) {
        db.User.findAll({
            where: {
                location: location
            },
            include: [{
                model: db.Item,
                as: "Lending"
            }]
        }).then(function(dbItem) {
            var itemsObject = {
                items: dbItem
            };
            res.json(dbItem);
            res.render("", itemsObject);
        });
    });

    // Get all items lent by user
    app.get("/items-by-lender", function(req, res) {
        var userDataId = req.user.id;
        db.Item.findAll({
            where: {
                lender_id: userDataId
            },
            include: [{
                model: db.User,
                as: "Borrower"
            }]
        }).then(function(dbItem) {
            var itemsObject = {
                items: dbItem
            };
            res.render("lend", itemsObject);
        });
    });

    // Get all items borrowed by user
    app.get("/items-by-borrower", function(req, res) {
        var userDataId = req.user.id;
        db.Item.findAll({
            where: {
                borrower_id: userDataId
            }
        }).then(function(dbItem) {
            var itemsObject = {
                items: dbItem
            };
            res.json(dbItem);
            res.render("borrow", itemsObject);
        });
    });

    // Lender update the status of an item to unavailable
    app.put("/item-unavailable", function(req, res) {
        db.Item.update({
            available: false
        }, {
            where: {
                id: req.body.itemId
            }
        }).then(function(dbPost) {
            res.render("lend");
        });
    });

    // Lender update the status of an item to available 
    app.put("/item-available", function(req, res) {
        db.Item.update({
            available: true
        }, {
            where: {
                id: req.body.itemId
            }
        }).then(function(dbPost) {
            res.render("lend");
        });
    });

    // Lender update the information from an item already posted
    app.put("/update-item", function(req, res) {
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
    app.delete("/delete-item", function(req, res) {
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