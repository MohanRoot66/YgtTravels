const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PaymentRules = sequelize.define("PaymentRules", {
    rule_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    supplier_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bsp_cost: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    invoice_needed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    recalculate_expected_supplier_payments: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    shared_cost: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    map_to_finance_account: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    acceptable_finance_suppliers: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accept_multiple_suppliers: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    acceptable_supplier_list: {
      type: DataTypes.TEXT, // For storing multiple supplier codes
      allowNull: true,
    },
    try_to_match: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    fully_match_source_invoice: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    supplier_payment_tolerance: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
  },{
    timestamps:false
  });

  PaymentRules.associate = (models) => {
    PaymentRules.belongsTo(models.Suppliers, {
      foreignKey: "supplier_code",
      targetKey: "supplierCode",
      as: "Supplier",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return PaymentRules;
};
