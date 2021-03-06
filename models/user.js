module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        fullName: {
            type: DataTypes.STRING,
        },
        privilege: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        location: {
            type: DataTypes.STRING,
        }
    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Item, {
                        as: 'Lending',
                        foreignKey: 'lender_id',
                        onDelete: "cascade"
                    }),
                    User.hasMany(models.Item, {
                        as: 'Borrowing',
                        foreignKey: 'borrower_id'
                    })
            }
        }
    });
    return User;
};