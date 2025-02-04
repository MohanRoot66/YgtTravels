const { DataTypes } = require("sequelize");

const BookingSupplier = (sequelize) => {
    return sequelize.define("AceFeed", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        bookingId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "BookingDetails",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        supplierId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "Suppliers",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        arrivalDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        leaveDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        
    }, {
        timestamps: false,  // Adds createdAt and updatedAt fields
    });
};

module.exports = BookingSupplier;
