var db = require("../models");

var itemId = 1;
var userDataId = 1;
var itemCat = "Homegoods";
var location = "san diego"

// Routes
// =============================================================
module.exports = function(app) {

    // CREATE
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

    // RETRIEVE 
    // Select all items in database
    app.get("/api/allItems", function(req, res) {
        db.Item.findAll({}).then(function(dbItem) {
            res.json(dbItem);
        });
    });

    // Select all items from chosen category
    app.get("/api/itemsCategory", function(req, res) {
        db.Item.findAll({
            where: {
                category: itemCat
            }
        }).then(function(dbItem) {
            res.json(dbItem);
        });
    });

    // Select all items from a chosen location
    app.get("/api/itemsLocation", function(req, res) {
        db.User.findAll({
            where: {
                location: location
            },
            include: [db.Item]
        }).then(function(dbItem) {
            res.json(dbItem);
        });
    });

    // UPDATE
    // Lender update the status of an item to unavailable
    app.put("/api/itemUnavailable", function(req, res) {
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

    // Lender update the status of an item to available 
    app.put("/api/itemAvailable", function(req, res) {
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

    // Lender update the information from an item already posted
    app.put("/api/updateItem", function(req, res) {
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
        });
    });

    // DELETE
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