module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: 1
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: function(models) {
                Item.belongsTo(models.User, {
                        as: "Lender",
                        foreignKey: 'lender_id',
                        allowNull: false
                    }),
                    Item.belongsTo(models.User, {
                        as: "Borrower",
                        foreignKey: 'borrower_id',
                        allowNull: true,
                        defaultValue: null
                    });
            }
        }
    });
    return Item;
};