const sequelizeController = require("../sequelize_controller");
const jsonData = require("./aceFeed.json");

const saveAcefeedMasterData = async (req, res) => {
    try {
        const AcefeedMasterData = sequelizeController.getModel("AceFeedMasterData");
        const SupplierMasterData = sequelizeController.getModel("Supplier");

        const { 
            bookingRef, 
            bookingDate, 
            departureDate, 
            noOfPax, 
            leadPax, 
            Suppliers 
        } = jsonData.data;

        // Loop through each supplier and save data into AcefeedMasterData
        for (const supplierData of Suppliers) {
            const {  
                supplierCode,   
                details 
            } = supplierData;

            const {
                status,
                arrivalDate,
                leaveDate,
                Currency: currency,
                ExchangeRate: exchangeRate,
                TotalCost: totalCostLocal
            } = details;

            // Check if supplier code exists in SupplierMasterData
            const retrievedSupplier = await SupplierMasterData.findOne({
                where: { supplierCode },
            });

            if (!retrievedSupplier) {
                console.warn(`Invalid supplier code: ${supplierCode}`);
                return res.status(400).json({
                    message: `Invalid supplier code: ${supplierCode}`,
                });
            }

            // Insert into AcefeedMasterData
            await AcefeedMasterData.create({
                exportDate: new Date(), // Assuming exportDate is the current date
                supplier: supplierCode,
                status: status || "N",
                description:retrievedSupplier.supplierName, // Default status to "Pending" if null
                bookingRef,
                leadPax,
                noOfPax,
                bookingDate,
                departureDate,
                arrivalDate: arrivalDate || new Date(), // Default to current date if null
                leaveDate: leaveDate || new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // Default to 5 days after arrival
                currency: currency || "USD", // Default currency to "USD" if null
                exchangeRate: exchangeRate || 1, // Default exchange rate to 1 if null
                totalCostLocal: totalCostLocal || 0, // Default total cost to 0 if null
            });
        }

        res.status(201).json({ message: "Acefeed master data saved successfully." });
    } catch (error) {
        console.error("Error saving Acefeed master data:",error, error.message);

        res.status(500).json({
            message: "Failed to save Acefeed master data.",
            error: error.message,
        });
    }
};

module.exports = saveAcefeedMasterData;
