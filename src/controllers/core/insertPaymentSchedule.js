const moment = require("moment");
const sequelizeController = require("../sequelize_controller");
const aceFeed = require("./aceFeed.json");
const paymentRules = require("./addTerms.json"); // Assuming you have a JSON file with data

// Insert PaymentSchedular data
const insertPaymentSchedular = async (feed, terms) => {
  try {
    const PaymentSchedular = sequelizeController.getModel("PaymentSchedular");

    const { bookingRef, bookingDate, departureDate, noOfPax, leadPax, Suppliers } = feed.data;

    // Iterate over each supplier
    for (const supplier of Suppliers) {
      const { supplierCode, details } = supplier;
      const { status, arrivalDate, leaveDate, Currency, ExchangeRate, TotalCost } = details;

      // Iterate over each payment term for the supplier
      for (const term of terms) {
        const {
          term_type,
          term_days,
          payment_basis,
          payment_time,
          payment_trigger,
          amount, // Optional amount
          percentage, // Optional percentage
        } = term;

        // Determine the trigger date (Check In is assumed to be the departureDate)
        const triggerDate = payment_trigger === "Check In" ? moment(arrivalDate) : moment(bookingDate);

        // Calculate the due date based on payment_time (Before or After)
        const dueDate =
          payment_time === "Before"
            ? triggerDate.subtract(term_days, "days")
            : triggerDate.add(term_days, "days");

        // Determine the amount to use: prefer `amount` if provided, otherwise calculate from `percentage`
        const calculatedAmount = amount ?? (percentage ? (percentage / 100) * TotalCost : 0);

        // Create a new record in the PaymentSchedular table
        await PaymentSchedular.create({
          supplierCode,
          supplierName: feed.data.leadPax, // Assuming leadPax is the supplier's name
          bookingRef,
          bookingStatus: status || "Confirmed",
          bookingDate,
          departureDate,
          arrivalDate,
          leaveDate,
          lastUpdated: moment().toDate(),
          dueDate: dueDate.toDate(),
          description: term_type,
          leadPassenger: leadPax,
          currency: Currency,
          amount: calculatedAmount, // Use calculated amount
        });
      }
    }

    console.log("Data inserted into PaymentSchedular table.");
  } catch (error) {
    console.error("Error inserting payment terms:", error);
  }
};

// API endpoint to save payment schedular data
const savePaymentSchedularData = async (req, res) => {
  try {
    const feed = aceFeed; // Assuming jsonData contains the feed data
    const terms = paymentRules.terms; // Assuming jsonData contains the terms data

    await insertPaymentSchedular(feed, terms);

    res.status(200).json({ message: "Payment schedule generated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error generating payment schedule.", error });
  }
};

module.exports = savePaymentSchedularData;
