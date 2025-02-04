const sequelizeController = require("../sequelize_controller");
const jsonData = require("./addTerms.json");

const SupplierPaymentTerms = async (req, res) => {
  try {
    const PaymentTerms = sequelizeController.getModel("PaymentTerms");
    const SupplierMasterData = sequelizeController.getModel("Supplier");

    const { supplierCode, terms } = jsonData;

    // Validate supplier exists
    const supplier = await SupplierMasterData.findOne({
      where: { supplierCode },
    });

    if (!supplier) {
      return res.status(400).json({
        message: `Supplier with code ${supplierCode} not found.`,
      });
    }

    // Loop through terms and save them
    for (const term of terms) {
      const {
        term_type,
        term_days,
        payment_basis,
        payment_time,
        payment_trigger,
        percentage,
      } = term;

      await PaymentTerms.create({
        supplierCode,
        term_type,
        term_days,
        payment_basis,
        payment_time,
        payment_trigger,
        percentage,
      });
    }

    res.status(201).json({
      message: "Supplier payment terms saved successfully.",
    });
  } catch (error) {
    console.error("Error saving supplier payment terms:", error.message);

    res.status(500).json({
      message: "Failed to save supplier payment terms.",
      error: error.message,
    });
  }
};

module.exports = SupplierPaymentTerms;
