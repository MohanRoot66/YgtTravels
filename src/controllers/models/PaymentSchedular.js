const { DataTypes } = require("sequelize");

const PaymentSchedular = (sequelize) => {
    return sequelize.define("PaymentSchedular", {
        supplierCode: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "Suppliers", // Related table name
                key: "supplierCode", // Related column
            },
        },
        supplierName: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "Name of the supplier",
        },
        bookingRef: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Unique reference for the booking",
        },
        bookingStatus: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "Current status of the booking",
        },
        bookingDate: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "Date when the booking was created",
        },
        departureDate: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "Date of departure for the booking",
        },
        arrivalDate: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "Arrival date for the booking",
        },
        leaveDate: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "Leave date for the booking",
        },
        lastUpdated: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "Last updated date for the payment record",
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: "Date when the payment is due",
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Description of the payment (e.g., Deposit, Final)",
        },
        leadPassenger: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "Name of the lead passenger for the booking",
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Currency used for the payment",
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            comment: "Payment amount",
            validate: {
                min: 0,
            },
        },
    }, {
        tableName: "PaymentSchedular",
        timestamps: false, // Disable automatic timestamp columns (createdAt, updatedAt)
    });
};

module.exports = PaymentSchedular;
