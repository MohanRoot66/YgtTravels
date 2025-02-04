const sequelizeController = require("../sequelize_controller");

const addSuppliersToBooking = async (req, res) => {
    try {
        const { bookingData, suppliers } = req.body;

        if (!bookingData) {
            return res.status(400).json({ error: "Booking data is required." });
        }

        const BookingDetails = sequelizeController.getModel("BookingDetails");
        const Supplier = sequelizeController.getModel("Supplier");
        const BookingSupplier = sequelizeController.getModel("BookingSupplier");

        // Check if bookingRef already exists
        const existingBooking = await BookingDetails.findOne({
            where: { bookingRef: bookingData.bookingRef }
        });

        if (existingBooking) {
            return res.status(400).json({ error: `Booking with reference ${bookingData.bookingRef} already exists.` });
        }

        // Insert new booking
        const newBooking = await BookingDetails.create({
            bookingRef: bookingData.bookingRef,
            bookingDate: bookingData.bookingDate,
            departureDate: bookingData.departureDate,
            durationNights: bookingData.durationNights,
            noOfPax: bookingData.noOfPax,
            leadPax: bookingData.leadPax,
        });

        if (suppliers && Array.isArray(suppliers) && suppliers.length > 0) {
            // Insert each supplier record along with booking reference
            for (const supplier of suppliers) {
                // Fetch supplier details from the database using the supplierId
                const supplierRecord = await Supplier.findOne({ 
                    where: { id: supplier.supplierId } 
                });

                if (!supplierRecord) {
                    return res.status(404).json({ error: `Supplier with code ${supplier.supplierId} not found.` });
                }

                // Create a new entry in BookingSupplier using the supplier data
                await BookingSupplier.create({
                    bookingId: newBooking.id,  // Link to the new booking
                    supplierId: supplierRecord.id,  // Link to the supplier
                    status: supplierRecord.status,
                    bookingReference: supplierRecord.bookingRef,
                    description: supplierRecord.description,
                    leadPax: bookingData.leadPax,  // Pass leadPax from BookingDetails
                    numberOfPax: supplier.numberOfPax,
                    bookingDate: bookingData.bookingDate,  // Pass bookingDate from BookingDetails
                    departureDate: bookingData.departureDate,  // Pass departureDate from BookingDetails
                    arrivalDate: supplierRecord.arrivalDate,  // Use supplier-specific arrival date
                    leaveDate: supplierRecord.leaveDate,  // Use supplier-specific leave date
                    currency: supplierRecord.currency,
                });
            }
        }

        res.status(201).json({
            message: "Booking and suppliers added successfully.",
            data: newBooking,
        });

    } catch (error) {
        console.error("Error inserting booking with suppliers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { addSuppliersToBooking };
