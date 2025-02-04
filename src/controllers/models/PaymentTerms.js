const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PaymentTerms = sequelize.define("PaymentTerms", {
    term_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    term_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Deposit", "Final"]], // Ensures valid term types
      },
    },
    term_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    payment_basis: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Per Booking", "Per Person"]], // Restrict to specific basis options
      },
    },
    payment_time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Before", "After"]], // Restrict to "Before" or "After"
      },
    },
    payment_trigger: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    percentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    supplierCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Suppliers", // Name of the related table
        key: "supplierCode", // The column in the related table
      },
    },
  },{
    timestamps:false
  });

  PaymentTerms.associate = (models) => {
    PaymentTerms.belongsTo(models.Suppliers, {
      foreignKey: "supplierCode", // Use supplierCode for the foreign key
      targetKey: "supplierCode", // Match with the supplierCode in Suppliers
      as: "supplier",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return PaymentTerms;
};

// Fields:

// term_id: Primary key, auto-incremented.
// term_type: Specifies whether the term is a deposit or final payment.
// term_days: Number of days for the term.
// payment_basis: Defines whether the term is per booking or per person.
// payment_time: Specifies if the payment is before or after the trigger.
// payment_trigger: Trigger for payment, e.g., "Check In."
// percentage: Percentage of the total payment allocated for this term.
