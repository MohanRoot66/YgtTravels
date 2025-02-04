const sequelizeController = require("../sequelize_controller");

const insertSupplierDetails = async (req,res) =>{
    try {
        const Supplier = sequelizeController.getModel("Supplier");

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

module.exports={
    insertSupplierDetails
}