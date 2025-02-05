const sequelizeController = require("../sequelize_controller");
const jsonData = require("./paymentRules.json"); // Your payment rules JSON data file

const PaymentRulesData = async (req, res) => {
  try {
    const PaymentRules = sequelizeController.getModel("PaymentRules");
    const SupplierMasterData = sequelizeController.getModel("Supplier");
    
    // Sample payload from the JSON data or request body
    const {
      supplier_code,
      bsp_cost,
      invoice_needed,
      recalculate_expected_supplier_payments,
      shared_cost,
      map_to_finance_account,
      acceptable_finance_suppliers,
      accept_multiple_suppliers,
      acceptable_supplier_list,
      try_to_match,
      fully_match_source_invoice,
      supplier_payment_tolerance,
    } = jsonData;

    const supplier = await SupplierMasterData.findOne({
        where: { supplierCode : supplier_code },
      });
  
      if (!supplier) {
        return res.status(400).json({
          message: `Supplier with code ${supplier_code} not found.`,
        });
      }
  

    // Insert payment rules directly into the database
    await PaymentRules.create({
      supplier_code,
      bsp_cost,  // Already a boolean
      invoice_needed,  // Already a boolean
      recalculate_expected_supplier_payments,  // Already a boolean
      shared_cost,  // Already a boolean
      map_to_finance_account,  // Already a boolean
      acceptable_finance_suppliers: acceptable_finance_suppliers || "N/A", // Default to "N/A" if empty
      accept_multiple_suppliers,  // Already a boolean
      acceptable_supplier_list: acceptable_supplier_list ? acceptable_supplier_list.join(", ") : "", // Store as comma-separated
      try_to_match,  // Already a boolean
      fully_match_source_invoice,  // Already a boolean
      supplier_payment_tolerance: supplier_payment_tolerance || 0, // Default to 0 if empty
    });

    res.status(201).json({ message: "Payment rules saved successfully." });
  } catch (error) {
    console.error("Error saving payment rules:", error.message);
    res.status(500).json({
      message: "Failed to save payment rules.",
      error: error.message,
    });
  }
};

module.exports = { PaymentRulesData };
