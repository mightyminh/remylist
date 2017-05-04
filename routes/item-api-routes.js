var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // POST a new item to lend
    app.post("/api/lend", function(req, res) {
        db.Item.create({
            name: "sewing maching",
            category: "Homegoods",
            description: "simple sewing machine",
            imageURL: "https://images-na.ssl-images-amazon.com/images/I/6183wgXfS5L._SL1500_.jpg",
            UserId: 1
        }).then(function(dbItem) {
            res.json(dbItem);
        });
    });
};