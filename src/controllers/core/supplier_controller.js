const sequelizeController = require("../sequelize_controller");

const insertSupplierDetails = async (req,res) =>{
    try {
        const Supplier = sequelizeController.getModel("Supplier");

        const { supplierCode } = req.body

        const supplier = await Supplier.findOne({
          where: { supplierCode: supplierCode },  // Filtering by supplierCode
        });
    
        if (supplier) {
          return res.status(404).json({ message: "Supplier code already found" });
        }

        const newSupplier = await Supplier.create(req.body);
        
        res.status(201).json({
            data : newSupplier
        });

    } 
    catch (error) {
        console.error("Error inserting supplier details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getAllSuppliers = async (req, res) => {
    try {
      const Supplier = sequelizeController.getModel("Supplier");
  
      // Fetch all supplier data from the database
      const data = await Supplier.findAll();
  
      res.status(200).json({
        message: "Data fetched successfully",
        data,
      });
    } catch (error) {
      console.error("Error fetching supplier details:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // Get supplier by supplierCode
const getSupplierByCode = async (req, res) => {
    try {
      const { supplierCode } = req.params;  // Get the supplierCode from request params
      const Supplier = sequelizeController.getModel("Supplier");
  
      // Fetch supplier data by supplierCode
      const supplier = await Supplier.findOne({
        where: { supplierCode: supplierCode },  // Filtering by supplierCode
      });
  
      if (!supplier) {
        return res.status(404).json({ message: "Supplier not found" });
      }
  
      res.status(200).json({
        message: "Supplier data fetched successfully",
        supplier,
      });
    } catch (error) {
      console.error("Error fetching supplier details:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const getSupplierTerms = async (req, res) => {
    try {
      const { supplierCode } = req.params; // Extract supplierCode from the route params
      const PaymentTerms = sequelizeController.getModel("PaymentTerms"); // Get the PaymentTerms model
  
      // Fetch payment terms for the given supplierCode
      const terms = await PaymentTerms.findAll({
        where: { supplierCode }, // Filter by supplierCode
      });
  
      if (!terms || terms.length === 0) {
        return res.status(404).json({ message: "No payment terms found for this supplier" });
      }
  
      res.status(200).json({
        message: "Payment terms fetched successfully",
        terms,
      });
    } catch (error) {
      console.error("Error fetching payment terms:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const getSupplierRules = async (req, res) => {
    try {
      const { supplierCode } = req.params; // Extract supplierCode from the route params
      const PaymentRules = sequelizeController.getModel("PaymentRules"); // Get the PaymentRules model
  
      // Fetch payment rules for the given supplierCode
      const rules = await PaymentRules.findAll({
        where: { supplier_code: supplierCode }, // Filter by supplierCode (matches supplier_code)
      });
  
      if (!rules || rules.length === 0) {
        return res.status(404).json({ message: "No payment rules found for this supplier" });
      }
  
      res.status(200).json({
        message: "Payment rules fetched successfully",
        rules,
      });
    } catch (error) {
      console.error("Error fetching payment rules:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const updateSupplierDetails = async (req, res) => {
    try {
      const { supplierCode } = req.params; // Extract supplierCode from request params
      const { address, telephone, email, contactPerson } = req.body; // Extract fields to update from request body
      const Supplier = sequelizeController.getModel("Supplier"); // Get the Supplier model
  
      // Fetch the supplier by supplierCode
      const supplier = await Supplier.findOne({
        where: { supplierCode }, // Filter by supplierCode
      });
  
      if (!supplier) {
        return res.status(404).json({ message: "Supplier not found" });
      }
  
      // Update only the fields provided in the request body
      const updatedData = {};
      if (address) updatedData.address = address;
      if (telephone) updatedData.telephone = telephone;
      if (email) updatedData.email = email;
      if (contactPerson) updatedData.contactPerson = contactPerson;
  
      // Perform the update
      await supplier.update(updatedData);
  
      res.status(200).json({
        message: "Supplier details updated successfully",
        data: supplier,
      });
    } catch (error) {
      console.error("Error updating supplier details:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


module.exports={
    insertSupplierDetails,
    getAllSuppliers,
    getSupplierByCode,
    getSupplierTerms,
    getSupplierRules,
    updateSupplierDetails
}