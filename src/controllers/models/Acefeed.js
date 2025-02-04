const { DataTypes } = require("sequelize");

const AcefeedMasterData = (sequelize) => {
    return sequelize.define("AcefeedMasterData", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        exportDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        supplier: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bookingRef: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        leadPax: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        noOfPax: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bookingDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        departureDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        arrivalDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        leaveDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        exchangeRate: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        totalCostLocal: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
    }, {
        timestamps: false,
        tableName: "AcefeedMasterData",
    });
};

module.exports = AcefeedMasterData;
