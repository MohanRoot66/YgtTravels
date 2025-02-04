const sequelizeController = require("../sequelize_controller");

const getBookingWithSuppliers = async (req, res) => {
    try {
        const {bookingRef} = req.query;

        if (!bookingRef) {
            return res.status(400).json({ error: "Booking ID is required." });
        }

        const BookingDetails = sequelizeController.getModel("BookingDetails");
        const Supplier = sequelizeController.getModel("Supplier");
        const BookingSupplier = sequelizeController.getModel("BookingSupplier");

        // Fetch the booking details along with suppliers and the associated details
        const booking = await BookingDetails.findOne({
            where: { bookingRef: bookingRef },
            include: [
                {
                    model: Supplier,
                    through: { 
                        model: BookingSupplier, 
                        attributes: ['status', 'arrivalDate', 'leaveDate'], // include status, arrivalDate, and leaveDate from BookingSupplier
                    },
                    attributes: [
                        'id', 'supplierName', 'supplierCode', 'email', 'telephone', // Add fields from Supplier model
                    ],
                }
            ]
        });

        if (!booking) {
            return res.status(404).json({ error: `Booking with ID ${bookingRef} not found.` });
        }

        // Return the booking and supplier data
        res.status(200).json({
            message: "Booking and suppliers fetched successfully.",
            data: booking,
        });
    } catch (error) {
        console.error("Error fetching booking with suppliers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getBookingWithSuppliers };
