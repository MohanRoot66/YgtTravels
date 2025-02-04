const { DataTypes } = require("sequelize");

const BookingDetails = (sequelize) => {
    return sequelize.define("BookingDetails", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        bookingRef: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        bookingDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        departureDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        durationNights: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        noOfPax: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        leadPax: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,  // Adds createdAt and updatedAt fields
    });
};

module.exports = BookingDetails;
