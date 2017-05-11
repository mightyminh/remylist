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
            name: req.body.addItemName,
            category: req.body.addItemCategory,
            description: req.body.addItemDescription,
            imageURL: req.body.addItemUrl,
            lender_id: req.body.addItemLender
        }).then(function(dbItem) {});
    });

    // RETRIEVE 
    // Select all items in database
    app.get("/all-items", function(req, res) {
        var userDataId = null;
        var loggedInUser = false;
        if (req.user) {
            userDataId = req.user.id;
            loggedInUser = true;
        }

        db.Item.findAll({
            include: [{
                model: db.User,
                as: "Lender"
            }]
        }).then(function(dbItem) {
            var itemsObject = {
                items: dbItem,
                userLoggedIn: loggedInUser,
                reqUserId: userDataId
            };
            res.render("allItems", itemsObject);
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
            // res.json(dbItem);
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
                items: dbItem,
                userId: userDataId
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
            // res.json(dbItem);
            res.render("borrow", itemsObject);
        });
    });

    // UPDATE
    // Lender update the status of an item to unavailable
    app.put("/item-unavailable", function(req, res) {
        db.Item.update({
            available: false
        }, {
            where: {
                id: req.body.itemId
            }
        }).then(function(dbItem) {
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
        }).then(function(dbItem) {
            res.render("lend");
        });
    });

    app.put("/set-borrower", function(req, res) {
        db.Item.update({
            borrower_id: req.user.id,
            available: false
        }, {
            where: {
                id: parseInt(req.body.itemId)
            }
        }).then(function(dbItem) {});
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
                id: parseInt(req.body.itemId)
            }
        }).then(function(dbPost) {
            res.render("lend");
        });
    });
};